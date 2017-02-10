import React from 'react';
import classNames from 'classnames/bind';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock, PanelGroup} from 'react-bootstrap'
import {addToListAction, deleteFromListAction, addProfileAction} from '../redux/actions';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import styles from 'css/components/home';
import requestApi from '../utilities/requests';
import _ from 'lodash';

import {FieldView, ListField, StatField, SavesView, EquiptmentTextAreaView} from '../components/characterSheetElements'
import panelBuilder from '../components/panelBuilder'


function mapStateToProps(state, ownProps){
	var currentUser = state.get('currentUser')
	var userName = ownProps.userName || currentUser
  	return {
	    userName,
	    profiles : state.get('profiles').toJS(),
	    userProfile: state.getIn(['profiles', userName]),
	    edit : state.get('edit'),
	    party: _.get(state.get('profiles').toJS(),`${userName}.party`, [])
	}
}

function mapDispatchToProps(dispatch, ownProps){
  return {
  	addProfile: (profile) => dispatch(addProfileAction(profile)),
  	addPartyMember: (member) => dispatch(addToListAction(member)), 
  	deletePartyMember: (member) => dispatch(deleteFromListAction(member))
  }
}

export default class CharacterSheet extends React.Component {
	
	constructor(props){
 		super(props);
 		this.state={
 			showModal : false
 		};
 	}

 	openModal(){
 		this.setState({showModal : true})
 	}

 	closeModal(){
 		this.setState({showModal : false})
 	}


	modal(){
 		var self = this
 		return(
 			<Modal show={self.state.showModal} bsSize = "large" onHide={self.closeModal.bind(this)}>
	         	<Modal.Header closeButton>
	            	<Modal.Title><h3 className = "centerText black">{self.props.character}</h3></Modal.Title>
	          	</Modal.Header>
	          	<Modal.Body>
           			<Row>
						<Col md={4} className='centerText'>
							<FieldView label='Name' value='Name'/><br/>
							<FieldView label='Race' value='Race'/><br/>
							<FieldView label='Class' value='Class'/><br/>
							<FieldView label='Max HP' value='Max HP'/><br/>
							<FieldView label='HP' value='HP'/><br/>
							<FieldView label='Temp HP' value='Temp HP'/><br/>
							<FieldView label='Armor Class' value='Armor Class'/><br/>
							<FieldView label='Initiative' value='Initiative'/><br/>
							<FieldView label='Passive Perception' value='Passive Perception'/><br/>
							<FieldView label='Speed' value='Speed'/><br/> <br/>

							<SavesView label='Death Save' onFull='Player is Saved'/> <br/>
							<SavesView label='Death Fail' onFull='Player has Fallen'/> <br/>
							<br/>
						</Col>
						<Col md={4}>
							<StatField stat='Strength' list={['Athletics']}/>
							<StatField stat='Dexterity' list={['Acrobatics', 'Stealth', 'Slieght of Hand']}/>
							<StatField stat='Constitution' list={[]}/>
							<StatField stat='Intelligence' list={['Arcana', 'Nature', 'History', 'Religion', 'investigation']}/>
							<StatField stat='Wisdom' list={['Animal Handling', 'Medicine', 'Insight', 'Perception', 'Surival']}/>
							<StatField stat='Charisma' list={['Deception', 'Performance', 'Intimidation', 'Persuasion']}/>
						</Col>
						<Col md={4}>						
							<EquiptmentTextAreaView head='Weapons' equiptment={['Sword','Bow','Dagger']}/><br/>
							<EquiptmentTextAreaView head='Equipment' equiptment={["Helmet", "Full Mail", "Leather Boots"]} />
							<br/>
			 			</Col>
		 			</Row>
	           	</Modal.Body>	
	          	<Modal.Footer bsClass='noLine'>
	          	</Modal.Footer>
        	</Modal>
 			)
 	}




	render(){
		return(<span>
			<Button onClick={this.openModal.bind(this)}>{this.props.character}'s Sheet</Button> 
			{this.modal()}
			</span>
			)
	}



}

module.exports = connect(mapStateToProps , mapDispatchToProps)(CharacterSheet)