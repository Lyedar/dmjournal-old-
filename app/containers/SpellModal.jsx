import React from 'react';
import classNames from 'classnames/bind';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock, PanelGroup, Table, Well} from 'react-bootstrap'
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

export default class SpellBook extends React.Component {
	
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
 			<Modal  show={this.props.spellVisable} bsSize = "large" onHide={()=>self.props.setShowSpell()}>
	         	<Modal.Header closeButton>
	            	<Modal.Title className='centerText black'>{spell.name}</Modal.Title>
	          	</Modal.Header>
	          	<Modal.Body className='centerText black'>
	          	<h3 className='centerText'>Level : {spell.level}</h3>
	          	<h4 className='centerText'>{spell.ritual ? (<span>Ritual<br/></span>) : (<div/>)}</h4>
	          		<Row>
		          		<Col md={12}>
				 			<Well>
					 			Casting Time: {spell.casting_time} <br/>
					 			School : {spell.school}<br/>
					 			Range : {spell.range}<br/>
					 			Duration: {spell.duration}<br/>
					 			Verbal : {_.get(spell.components, 'verbal') ?  (<span>{spell.components.verbal.toString()}</span>) : (<div/>)}<br/>
					 			Somatic: {_.get(spell.components, 'somatic') ?  (<span>{spell.components.somatic.toString()}</span>) : (<div/>)}<br/>
					 			{_.get(spell.components, 'material') ? (<span>Components: {spell.components.materials_needed}</span>) : (<span>Components: None</span>)}
				 			</Well>
				 		</Col>
				 		<Col md={8} mdOffset={2}>

			 				<Well><p>{spell.description}</p></Well>
			 			</Col>
			 			<Col md={12}><Button>Cast</Button></Col>
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

module.exports = connect(mapStateToProps , mapDispatchToProps)(SpellBook)