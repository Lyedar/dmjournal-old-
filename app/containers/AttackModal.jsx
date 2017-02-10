import React from 'react';
import classNames from 'classnames/bind';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock, PanelGroup, Table} from 'react-bootstrap'
import {addToListAction, deleteFromListAction, addProfileAction, setShowSpell, setSpellActive} from '../redux/actions';
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
  		spellVisable: state.get('showSpell'),
  		spell: state.get('spellSelected'),
	    userName,
	    profiles : state.get('profiles').toJS(),
	    userProfile: state.getIn(['profiles', userName]),
	    edit : state.get('edit'),
	    party: _.get(state.get('profiles').toJS(),`${userName}.party`, [])
	}
}

function mapDispatchToProps(dispatch, ownProps){
  return {
  	setShowSpell: (toggle) => dispatch(setShowSpell(toggle)),
  	setSpell: (spell) => dispatch(setSpellActive(spell)),

  	addProfile: (profile) => dispatch(addProfileAction(profile)),
  	addPartyMember: (member) => dispatch(addToListAction(member)), 
  	deletePartyMember: (member) => dispatch(deleteFromListAction(member))
  }
}

export default class AttackModal extends React.Component {
	
	constructor(props){
 		super(props);
 		this.state={
 		};
 	}

 	componentWillMount(){
 		requestApi('api/v1/spell/' + this.props.spellId)()
 		.then((spell)=>{
 			console.log('spell, ' + spell)
 			if(spell){
 				this.props.setSpell(spell)
 			}
 		})
 	}


 	modal(){
 		var self = this
 		var spell = this.props.spell
 		return(
 			<Modal show={this.props.spellVisable} bsSize = "large" onHide={()=>self.props.setShowSpell()}>
	         	<Modal.Header closeButton>
	            	<Modal.Title className='centerText black'>{spell.name}</Modal.Title>
	          	</Modal.Header>
	          	<Modal.Body className='centerText black'>
	          		<Row>
		          		<Col md={6}>
				 			Level : {spell.level}<br/>
				 			Casting Time: {spell.casting_time} <br/>
				 			School : {spell.school}<br/>
				 			{spell.ritual ? (<span>Ritual<br/></span>) : (<div/>)}
				 			Range : {spell.range}<br/>
				 			Duration: {spell.duration}<br/>

				 			{_.get(spell.components, 'material') ? (<span>Components: {spell.components.materials_needed}</span>) : (<div/>)}
				 		</Col>
				 		<Col md={6}>
			 				<h3>description:</h3> <br/><p>{spell.description}</p>
			 			</Col>
			 			<Button>Cast</Button>
			 		</Row>	
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

module.exports = connect(mapStateToProps , mapDispatchToProps)(AttackModal)