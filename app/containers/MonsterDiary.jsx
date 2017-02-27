import React from 'react';
import classNames from 'classnames/bind';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock, PanelGroup, Table, Glyphicon} from 'react-bootstrap'
import {addToListAction, deleteFromListAction, addProfileAction, setMonsterActive, setShowMonster} from '../redux/actions';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import styles from 'css/components/home';
import requestApi from '../utilities/requests';
import _ from 'lodash';

import {FieldView, ListField, StatField, SavesView, EquiptmentTextAreaView} from '../components/characterSheetElements'
import panelBuilder from '../components/panelBuilder'
import MonsterModal from './MonsterModal'


function mapStateToProps(state, ownProps){
	var currentUser = state.get('currentUser')
	var userName = ownProps.userName || currentUser
  	return {
  		showMonster : state.get('showMonster'),
	    userName,
	    profiles : state.get('profiles').toJS(),
	    userProfile: state.getIn(['profiles', userName]),
	    edit : state.get('edit'),
	    party: _.get(state.get('profiles').toJS(),`${userName}.party`, [])
	}
}

function mapDispatchToProps(dispatch, ownProps){
  return {
  	setMonster: (monster) => dispatch(setMonsterActive(monster)),
  	setShowMonster: (toggle) => dispatch(setShowMonster(toggle)),
  	addProfile: (profile) => dispatch(addProfileAction(profile)),
  	addPartyMember: (member) => dispatch(addToListAction(member)), 
  	deletePartyMember: (member) => dispatch(deleteFromListAction(member))
  }
}

export default class MonsterDiary extends React.Component {
	
	constructor(props){
 		super(props);
 		this.state={
 			monsterId : false,
 			diaryButton : true,
 			directoryButton : false,
 			monsterList: [],
 			monsterTab: [],
 			showSpell: false,
 			name : true,
 			type: false,
 			environment: false,
 			challenge_rating: false,
 			error: false
 		};
 	}

 	componentWillMount(){
 		this.requestMonsterList()
 	}

 	requestMonsterList(){
 		self = this
 		requestApi('api/v1/allmonsters')()
 		.then((monsters)=>{
 			if(monsters){
 				self.setState({monsterList: monsters})
 				self.sortList('name')
 			}else{
 				self.setState({monsterList: ['nothing']})
 			}
 		})
 		
 	}

 	switchData(id){
 		if(id == 'diaryButton'){
 			this.setState({diaryButton : true, directoryButton : false})
 		}
 		if(id == 'directoryButton'){
 			this.setState({diarybookButton : false, directoryButton : true})
 		}
 	}

 	openMonster(id){
 		this.setState({monsterId : id })
 		this.props.setShowMonster(true)
 	}

 	tableSetUp(){
 		self = this
 		var tableList = self.state.monsterList.map(function(monster){
 			var name = monster.name
 			return (<tr className='hover' key={name + ' row'} onClick={(e)=> self.openMonster(monster.id)} >
		 				<td key={name + ' name'} className='centerText'>{name}</td>
		 				<td key={name + ' type'} className="centerText">{monster.type}</td>
		 				<td key={name + ' cr'} className='centerText'>{monster.challenge_rating}</td>
		 				<td key={name + ' environment'} className='centerText'>{monster.environment.join(', ')}</td>
	 				</tr>)
 		})
 		this.setState({monsterTab: tableList})
 	}

 	sortList(value){
 		var obj = {}
 		var list = this.state.monsterList
 		obj.name = false;
 		obj.type = false;
 		obj.challenge_rating = false;
 		obj.environment = false
 		obj[value] = true
 		if(value === 'name' || value === 'type'){
 			list.sort(function(a,b){
 				var textA = a[value].toUpperCase()
 				var textB = b[value].toUpperCase()
 				if (textA < textB) return -1;
  				if (textA > textB) return 1;
				return 0;
			})
		} else if (value === 'environment'){
			list.sort(function(a,b){
				var textA = a.environment.join()
				var textB = b.environment.join()
				if (textA < textB) return -1;
  				if (textA > textB) return 1;
				return 0;
			})	
		} else {
			list.sort(function(a,b){
				var crA = eval(a.challenge_rating)
				var crB = eval(b.challenge_rating)
				if (crA < crB) return -1;
  				if (crA > crB) return 1;
				return 0;
			})
		}
		obj.monsterList = list
		this.tableSetUp()
 		this.setState(obj)
 	}

 	monsterTable(){
 		return(
 				<Table key='monsterTable' bordered condensed hover>
 					<thead key='monsterthead'>
 						<tr>
 							<th key='namehead'className='centerText'>Name <Glyphicon glyph={this.state.name ? 'chevron-up' : 'minus' } onClick={()=>this.sortList('name')}  /></th>
 							<th key='typehead'className='centerText'>Type <Glyphicon glyph={this.state.type ? 'chevron-up' : 'minus' } onClick={()=>this.sortList('type')}  /></th>
 							<th key='crhead'className='centerText'>Challenge Rating <Glyphicon glyph={this.state.challenge_rating ? 'chevron-up' : 'minus' } onClick={()=>this.sortList('challenge_rating')} /></th>
 							<th key='environmenthead'className='centerText'>Environment <Glyphicon glyph={this.state.environment ? 'chevron-up' : 'minus' } onClick={()=>this.sortList('environment')}  /></th>
	        			</tr>
 					</thead>
 					<tbody key='monstertbody'>
 						{this.state.monsterTab}
 					</tbody>
 				</Table>)
 	}


	render(){
		return(<Row>
			<Col md={4} mdOffset={4} className = 'centerText'>
				<Button id='diaryButton' active={this.state.diaryButton} onClick={(e)=> this.switchData(e.target.id)}> Your Diary </Button>
				<Button id='directoryButton' active={this.state.directoryButton} onClick={(e)=>this.switchData(e.target.id)}> Directory </Button>
			</Col>
			<Col md={1} mdOffset={3}>
				<Button id='addspellButton'><Glyphicon glyph={'plus'} /> </Button>
			</Col>	
			<Col md={12}>
				<br/><br/>
				{this.monsterTable()}
			</Col>
			{this.props.showMonster ? <MonsterModal monsterId={this.state.monsterId}/> : <br/>}

			</Row>
			)
	}



}

module.exports = connect(mapStateToProps , mapDispatchToProps)(MonsterDiary)