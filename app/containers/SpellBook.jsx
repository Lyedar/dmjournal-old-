import React from 'react';
import classNames from 'classnames/bind';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock, PanelGroup, Table, Glyphicon} from 'react-bootstrap'
import {addToListAction, deleteFromListAction, addProfileAction, setSpellActive, setShowSpell} from '../redux/actions';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import styles from 'css/components/home';
import requestApi from '../utilities/requests';
import _ from 'lodash';

import {FieldView, ListField, StatField, SavesView, EquiptmentTextAreaView} from '../components/characterSheetElements'
import panelBuilder from '../components/panelBuilder'
import SpellModal from './SpellModal'


function mapStateToProps(state, ownProps){
	var currentUser = state.get('currentUser')
	var userName = ownProps.userName || currentUser
  	return {
  		showSpell : state.get('showSpell'),
	    userName,
	    profiles : state.get('profiles').toJS(),
	    userProfile: state.getIn(['profiles', userName]),
	    edit : state.get('edit'),
	    party: _.get(state.get('profiles').toJS(),`${userName}.party`, [])
	}
}

function mapDispatchToProps(dispatch, ownProps){
  return {
  	setSpell: (spell) => dispatch(setSpellActive(spell)),
  	setShowSpell: (toggle) => dispatch(setShowSpell(toggle)),

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
 			name: true,
 			level: false,
 			school: false,
 			classes: false,
 			error: false
 		};
 	}

 	requestSpellList(){
 		self = this
 		requestApi('api/v1/allspells')()
 		.then((spells)=>{
 			if(spells){
 				self.setState({spellList: spells})
 				self.tableSetUp()
 			}else{
 				self.setState({spellsList: ['nothing']})
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

 	closeModal(){
 		this.setState({showModal : false})
 	}

 	showModal(){
 		var self = this
 		self.requestSpellList()
 		self.setState({showModal: true})
 	} 		

 	openSpell(id){
 		this.setState({spellId : id })
 		this.props.setShowSpell(true)
 	}

 	tableSetUp(){
 		self = this
 		var tableList = self.state.spellList.map(function(spell){
 			var name = spell.name
 			return (<tr key={name + ' row'} onClick={(e)=> self.openSpell(spell.id)}>
		 				<td key={name + ' level'} className='centerText'>{spell.level}</td>
		 				<td key={name + ' name'} className='centerText'>{name}</td>
		 				<td key={name + ' classes'} className='centerText'>{ spell.classes.map((el) => 
		 					(<span key={name + ' ' + el} className='centerText'>{el} <br/> </span>)) }
		 				</td>
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
 				<Table key='spellTable' className='black' striped bordered condensed hover>
 					<thead key='spellthead'>
 						<tr>
	 						<th key='levelhead'className='black centerText'>Level <Glyphicon glyph={this.state.level ? 'chevron-up' : 'minus' } onClick={()=>this.sortList('level')}  /></th>
	        				<th key='namehead'className='black centerText'>Name <Glyphicon glyph={this.state.name ? 'chevron-up' : 'minus' } onClick={()=>this.sortList('name')}  /></th>
	        				<th key='classeshead'className='black centerText'>Classes <Glyphicon glyph={this.state.class ? 'chevron-up' : 'minus' } onClick={()=>this.sortList('class')}  /></th>
	        				<th key='schoolheadd'className='black centerText'>School <Glyphicon glyph={this.state.school ? 'chevron-up' : 'minus' } onClick={()=>this.sortList('school')}  /></th>
	        			</tr>
 					</thead>
 					<tbody key='spelltbody'>
 						{this.state.spellTab}
 					</tbody>
 				</Table>)
 	}

 	modal(){
 		return(
 			<Modal show={this.state.showModal} bsSize = "large" onHide={this.closeModal.bind(this)}>
	         	<Modal.Header closeButton>
	            	<Modal.Title className='centertext black'>SpellBook</Modal.Title>
	          	</Modal.Header>
	          	<Modal.Body>
		 			<Col md={4} mdOffset={4} className='centerText'>
						<Button id='spellbookButton' active={this.state.spellbookButton} onClick={(e)=> this.switchData(e.target.id)}> Your SpellBook </Button>
						<Button id='directoryButton' active={this.state.directoryButton} onClick={(e)=>this.switchData(e.target.id)}> Directory </Button>
					</Col>
					<Col md={1} mdOffset={3}>
						<Button id='addspellButton'><Glyphicon glyph={'plus'} /> </Button>
					</Col>	
					<Col md={12}>
					<br/><br/>
					{this.spellTable()}
					</Col>
				</Modal.Body>	
	          	<Modal.Footer bsClass='noLine'><span className = "centerText">end</span></Modal.Footer>
        	</Modal>				
 	)}

	render(){
		return(<span>
			<Button onClick={this.showModal.bind(this)}>SpellBook</Button>
			{this.modal()}
			{this.props.showSpell ? <SpellModal spellId={this.state.spellId}/> : <br/>}
			</span>
			)
	}



}

module.exports = connect(mapStateToProps , mapDispatchToProps)(SpellBook)