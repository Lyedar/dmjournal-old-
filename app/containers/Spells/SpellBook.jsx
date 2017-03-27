import React from 'react';
import classNames from 'classnames/bind';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock, PanelGroup, Table, Glyphicon} from 'react-bootstrap'
import {addToListAction, deleteFromListAction, addProfileAction, setSpellActive, setShowSpell, setShowModal, setModalBody, setModalHead, setModalFooter} from '../../redux/actions';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import styles from 'css/components/home';
import requestApi from '../../utilities/requests';
import _ from 'lodash';

import {FieldView, ListField, StatField, SavesView, EquiptmentTextAreaView} from '../../components/characterSheetElements'
import panelBuilder from '../../components/panelBuilder'
import ModalBuilder from '../../components/modalBuilder'
import SpellModal from './SpellModal'
import SpellCreator from './SpellCreator'


function mapStateToProps(state, ownProps){
	var currentUser = state.get('currentUser')
	var userName = ownProps.userName || currentUser
  	return {
  		showSpell : state.get('showSpell'),
  		showModal: state.getIn(['modal', 'showModal']),
	    userName,
	    profiles : state.get('profiles').toJS(),
	    userProfile: state.getIn(['profiles', userName]),
	    edit : state.get('edit'),
	    party: _.get(state.get('profiles').toJS(),`${userName}.party`, [])
	}
}

function mapDispatchToProps(dispatch, ownProps){
  return {
  	setSpell: (spell) => dispatch(setSpellActive(spell)), // set current spell
  	setShowSpell: (toggle) => dispatch(setShowSpell(toggle)), //
  	setModalHead: (mh) => dispatch(setModalHead(mh)),
  	setModalBody: (mb) => dispatch(setModalBody(mb)),
  	setShowModal: (toggle) => dispatch(setShowModal(toggle)),
		setModalFooter: (toggle) => dispatch(setModalFooter(toggle)),

  	addProfile: (profile) => dispatch(addProfileAction(profile)),
  	addPartyMember: (member) => dispatch(addToListAction(member)),
  	deletePartyMember: (member) => dispatch(deleteFromListAction(member))
  }
}

export default class SpellBook extends React.Component {

	constructor(props){
 		super(props);
 		this.state={
 			spellId : false,
 			spellbookButton : true,
 			directoryButton : false,
 			showModal : false,
 			spellList: [],
 			spellTab: [],
 			showSpell: false,
 			showCreateSpell: false,
 			name: true,
 			level: false,
 			school: false,
 			classes: false,
 			error: false
 		};
 	}

 	componentWillMount(){
 		this.requestSpellList()
 	}

 	requestSpellList(){
 		requestApi('api/v1/allspells')()
 		.then((spells)=>{
 			if(spells){
 				this.setState({spellList: spells})
 				this.tableSetUp()
 			}else{
 				this.setState({spellsList: ['nothing']})
 			}
 		})

 	}

 	switchData(id){
 		if(id == 'spellbookButton'){
 			this.setState({spellbookButton : true, directoryButton : false})
 		}
 		if(id == 'directoryButton'){
 			this.setState({spellbookButton : false, directoryButton : true})
 		}
 	}


 	openSpell(id, name, creator){
 		this.props.setModalHead(<div className='black centerText'>{name}</div>);
 		this.props.setModalBody(<SpellModal spellId={id} />);
		this.props.setModalFooter(<div className='black centerText'>Creator: {creator}</div>);
 		this.props.setShowModal(true)
 	}
 	openSpellCreate(){
 		console.log('Create Spell should be true');
 		this.props.setModalHead(<span className='black centerText'>Spell Creator</span>);
 		this.props.setModalBody(<SpellCreator />);
 		this.props.setShowModal(true)
 	}

 	tableSetUp(){
 		self = this
 		var tableList = self.state.spellList.map(function(spell){
 			var name = spell.name
 			return (<tr className='hover' key={name + ' row'} onClick={(e)=> self.openSpell(spell.id, name, spell.creator)}>
		 				<td key={name + ' level'} className='centerText'>{spell.level}</td>
		 				<td key={name + ' name'} className='centerText'>{name}</td>
		 				<td key={name + ' school'} className='centerText'>{spell.school}</td>
	 				</tr>)
 		})
 		this.setState({spellTab: tableList})
 	}

 	sortList(value){
 	 	var obj = {}
 		var list = this.state.spellList
 		obj.name = false;
 		obj.level = false;
 		obj.school = false;
 		obj.class = false;
 		obj[value] = true
 		if(value === 'name' || value === 'school'){
 			list.sort(function(a,b){
 				var textA = a[value].toUpperCase()
 				var textB = b[value].toUpperCase()

 				if (textA < textB) return -1;
  				if (textA > textB) return 1;
				return 0;
			})
		} else if (value === 'class'){
			list.sort(function(a,b){
				var textA = a.classes.toString()
				var textB = b.classes.toString()
				if (textA < textB) return -1;
  				if (textA > textB) return 1;
				return 0;
			})
		} else {
			list.sort(function(a,b){
				var crA = eval(a.level === 'cantrip' ? '0' : a.level)
				var crB = eval(b.level === 'cantrip' ? '0' : b.level)
				if (crA < crB) return -1;
  				if (crA > crB) return 1;
				return 0;
			})
		}
		obj.monsterList = list
		this.tableSetUp()
 		this.setState(obj)
 	}

 	spellTable(){
 		return(
 				<Table key='spellTable' bordered condensed hover>
 					<thead key='spellthead'>
 						<tr>
	 						<th key='levelhead'className='centerText'>Level <Glyphicon glyph={this.state.level ? 'chevron-up' : 'minus' } onClick={()=>this.sortList('level')}  /></th>
	        				<th key='namehead'className='centerText'>Name <Glyphicon glyph={this.state.name ? 'chevron-up' : 'minus' } onClick={()=>this.sortList('name')}  /></th>
	        				<th key='schoolheadd'className='centerText'>School <Glyphicon glyph={this.state.school ? 'chevron-up' : 'minus' } onClick={()=>this.sortList('school')}  /></th>
	        			</tr>
 					</thead>
 					<tbody key='spelltbody'>
 						{this.state.spellTab}
 					</tbody>
 				</Table>)
 	}


	render(){
		return(<Row>
			<Col md={4} mdOffset={4} className='centerText'>
				<Button id='spellbookButton' active={this.state.spellbookButton} onClick={(e)=> this.switchData(e.target.id)}> Your SpellBook </Button>
				<Button id='directoryButton' active={this.state.directoryButton} onClick={(e)=>this.switchData(e.target.id)}> Directory </Button>
				</Col>
				<Col md={1} mdOffset={3}>
					<Button id='addspellButton' onClick={(e)=> this.openSpellCreate()}><Glyphicon glyph={'plus'}/> </Button>
				</Col>
				<Col md={12}>
				<br/><br/>
			{this.spellTable()}
			</Col>
			<ModalBuilder />
			</Row>
			)
	}



}

module.exports = connect(mapStateToProps , mapDispatchToProps)(SpellBook)
