import React from 'react';
import classNames from 'classnames/bind';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock, PanelGroup, Table, Clearfix, Well} from 'react-bootstrap'
import {addToListAction, deleteFromListAction, addProfileAction, setShowMonster, setMonsterActive} from '../redux/actions';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import styles from 'css/components/home';
import requestApi from '../utilities/requests';
import _ from 'lodash';

import getEXP from '../actions/getEXP'

import {FieldView, ListField, StatField, SavesView, EquiptmentTextAreaView} from '../components/characterSheetElements'
import PanelBuilder from '../components/panelBuilder'


function mapStateToProps(state, ownProps){
	var currentUser = state.get('currentUser')
	var userName = ownProps.userName || currentUser
  	return {
  		monsterVisable: state.get('showMonster'),
  		monster: state.get('monsterSelected'),

	    userName,
	    profiles : state.get('profiles').toJS(),
	    userProfile: state.getIn(['profiles', userName]),
	    edit : state.get('edit'),
	    party: _.get(state.get('profiles').toJS(),`${userName}.party`, [])
	}
}

function mapDispatchToProps(dispatch, ownProps){
  return {
  	setShowMonster: (toggle) => dispatch(setShowMonster(toggle)),
  	setMonster: (monster) => dispatch(setMonsterActive(monster)),

  	addProfile: (profile) => dispatch(addProfileAction(profile)),
  	addPartyMember: (member) => dispatch(addToListAction(member)), 
  	deletePartyMember: (member) => dispatch(deleteFromListAction(member))
  }
}

export default class MonsterModal extends React.Component {
	
	constructor(props){
 		super(props);
 		this.state={
 			skills : [],
 			saving_throws:[],
 			actions:[],
 			special_abilities:[],
 			legendary_actions:[]
 		};
 	}

 	componentWillMount(){
 		requestApi('api/v1/monster/' + this.props.monsterId)()
 		.then((monster)=>{
 			console.log('monster, ' + monster)
 			if(monster){
 				this.props.setMonster(monster)
 			}
 		}).then(()=>{
 			this.setObjects(this.props.monster.saving_throws, 'saving_throws')
 			this.setObjects(this.props.monster.skills, 'skills')
 			this.setArrays(this.props.monster.actions, 'actions')
			this.setArrays(this.props.monster.special_abilities, 'special_abilities')
 			this.setArrays(this.props.monster.legendary_actions, 'legendary_actions')
 		})
 		

 	}

 	setObjects(obj, string){
 		var tempArr = []
 		var tempObj = {}
 		_.each(obj, function(value, innerkey){
 			tempArr.push((<span>{innerkey} : +{value} <br/></span>))
 		})
 		tempObj[string] = tempArr
 		this.setState(tempObj)
 	}

 	setArrays(arr, string){
 		var tempArr = []
 		var tempObj = {}
 		arr.map(function(element){
 			tempArr.push((
 				<tr>
 				<td>{element.name}</td>
 				<td>{element.desc}</td>
 				{element.attack_bonus === 0 ? (<td>NA</td>):(<td>+{element.attack_bonus}</td>)}
 				<td>{element.damage_dice}{element.damage_bonus? (<span>+{element.damage_bonus}</span>) : (<span/>)}</td>
 				</tr>))
 		})
 		tempObj[string] = tempArr
 		console.log(tempObj)
 		this.setState(tempObj)
 	}

 	panels(actionType, visual){

 		return(
 			<Row>
	 			<PanelBuilder
	 				title= {visual+' type'}
	 				body={(<span>
				 			<Table key={actionType+' Table'} className='black' striped bordered condensed hover>
					 				<thead key={actionType+' thead'}>
										<tr>
											<th key={actionType+' namehead'} className='black centerText'>Name</th>
											<th key={actionType+' deschead'} className='black centerText'>Description</th>
											<th key={actionType+' abhead'} className='black centerText'>Attack Bonus</th>
											<th key={actionType+' damagehead'} className='black centerText'>Damage</th>
											
					    				</tr>
								</thead>
								<tbody key={actionType+' tbody'}>
				 					{this.state[actionType]} 
				 				</tbody>
			 				</Table>
				</span>)} />
	 		</Row>)
 	}


 	modal(){
 		var self = this
 		var monster = this.props.monster
 		return(
 			<Modal show={this.props.monsterVisable} bsSize = "large" onHide={()=>self.props.setShowMonster()}>
	         	<Modal.Header closeButton>
	            	<Modal.Title ><h2 className='centerText black'>{monster.name}</h2></Modal.Title>
	          	</Modal.Header>
	          	<Modal.Body className='centerText black'>
	          		<h3>Challenge Rating: {monster.challenge_rating}</h3>
	          		<h4>EXP: {getEXP(monster.challenge_rating)} </h4>
	          		<Well>
	          		<Row className= 'centerText'>
		          		<Col md={5}>
				 			<h5 className="inline">Name:</h5> {monster.name} <br />
				 			<h5 className="inline">Size:</h5> {monster.size} <br />
				 			<h5 className="inline">Type:</h5> {monster.type} <br />
				 			<h5 className="inline">SubType:</h5> {monster.subype} <br />
				 			<h5 className="inline">Alignment:</h5> {monster.alignment} <br />
				 			<h5 className="inline">Armor Class:</h5> {monster.armor_class} <br />
				 			<h5 className="inline">Hit Points:</h5> {monster.hit_points} ({monster.hit_dice}) <br />
				 			<h5 className="inline">Speed:</h5> {monster.speed} <br />
				 		</Col>
				 		<Col md={7}>
				 			<Table key='skills Table' className='black' striped bordered condensed hover>
				 				<thead key='skills thead'>
				 					<tr>
						 				<th key='strength head'>Strength</th> 
						 				<th key='dexterity head'>Dexterity</th> 
						 				<th key='constitution head'>Constitution</th> 
						 				<th key='intelligence head'>Intelligence</th> 
						 				<th key='wisdom head'>Wisdom</th> 
						 				<th key='charisma head'>Charisma</th> 
						 			</tr>	
				 				</thead>
				 				<tbody key='skills tbody' className='black' striped bordered condensed hover>
				 					<tr>
						 				<td key='strength tbody'>{monster.strength}</td>
										<td key='dexterity tbody'>{monster.dexterity}</td>
										<td key='constitution tbody'>{monster.constitution}</td>
										<td key='intelligence tbody'>{monster.intelligence}</td>
										<td key='wisdom tbody'>{monster.wisdom}</td>
										<td key='charisma tbody'>{monster.charisma}</td>
									</tr>
								</tbody>		
				 			</Table>	
			 			</Col>

						<Row>
							<Row>
				 			<Col md={3}>
				 				<h5 className='underLine'>Saving Throw Bonus: </h5>
				 				{this.state.saving_throws.length>0 ? this.state.saving_throws : (<span>None</span>)}
				 			</Col>
				 			<Col md={3}>
				 				<h5 className='underLine'>Skill Bonus:</h5>
				 					{this.state.skills.length>0 ? this.state.skills : (<span>None</span>)}
				 			</Col>
				 			</Row>
				 			<Row>
				 			<Col md={3}/>
					 		<Col md={3} className = 'centerText'>
					 			<h5 className='inline'>Damage Vulnerabilities: </h5>{monster.damage_vulnerabilities ?  monster.damage_vulnerabilities : (<span>None</span>)}<br />
					 			<h5 className='inline'>Damage Resistances: </h5>{monster.damage_resistances ?  monster.damage_resistances : (<span>None</span>)}<br />
					 		</Col>
					 		<Col md={3} className = 'centerText'>
					 			<h5 className='inline'>Damage Immunities: </h5>{monster.damage_immunities ?  monster.damage_immunities : (<span>None</span>)}<br />
					 			<h5 className='inline'>Condition Immunities: </h5>{monster.condition_immunities?  monster.condition_immunities : (<span>None</span>)}<br />
					 		</Col>
					 		</Row>
				 		</Row>
			 		</Row>
			 		</Well>
			 		{this.state.actions.length>0? this.panels('actions', 'Actions') : (<span/>)}
			 		{this.state.special_abilities.length>0? this.panels('special_abilities', 'Special Abilities') : (<span/>)}
			 		{this.state.legendary_actions.length>0? this.panels('legendary_actions', 'Legendary Actions') : (<span/>)}	
				</Modal.Body>	
	          	<Modal.Footer bsClass='noLine'><span className = "centerText">end</span></Modal.Footer>
        	</Modal>
        )	
 	}

	render(){
		return(
			<div>
				{this.modal()}
			</div>	
			)
	}



}

module.exports = connect(mapStateToProps , mapDispatchToProps)(MonsterModal)