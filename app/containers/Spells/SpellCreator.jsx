import React from 'react';
import classNames from 'classnames/bind';
import {Modal,
	Form, FieldGroup, FormControl, 
	ControlLabel, 
	Col, Row, 
	Button, HelpBlock,
	PanelGroup, Table,
	Well,
	FormGroup,
	InputGroup

} from 'react-bootstrap'
import {addToListAction, deleteFromListAction, addProfileAction, setShowModal, setModalHead, setModalBody, setSpellActive} from '../../redux/actions';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import styles from 'css/components/home';
import requestApi from '../../utilities/requests';
import _ from 'lodash';

import {FieldView, ListField, StatField, SavesView, EquiptmentTextAreaView} from '../../components/characterSheetElements'
import modalBuilder from '../../components/modalBuilder'
import panelBuilder from '../../components/panelBuilder'
import dndDefaults from '../../constants/dndDefaults'


function mapStateToProps(state, ownProps){
	var currentUser = state.get('currentUser')
	var userName = ownProps.userName || currentUser
  	return {
  		showCreate: state.getIn(['createSpell', 'show']),
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
  	setModalHead: (mh) => dispatch(setModalHead(mh)),
  	setModalBody: (mb) => dispatch(setModalBody(mb)),
  	setShowModal: (toggle) => dispatch(setShowModal(toggle)),

  	addProfile: (profile) => dispatch(addProfileAction(profile)),
  	addPartyMember: (member) => dispatch(addToListAction(member)), 
  	deletePartyMember: (member) => dispatch(deleteFromListAction(member))
  }
}

export default class SpellCreator extends React.Component {
	
	constructor(props){
 		super(props);
 		this.state={};
 	}

 	classSelector(){
 		var classes = dndDefaults.CLASSES //+ DM's custom classes if any
 		var newClasses = classes.map(function(curr){
 			return (<option value={curr} key={curr}> {curr} </option>)
 		})
 		return newClasses;
 	}

	render(){
		return(
				<div className='centerText black'>
 					<FormControl componentClass="input" placeholder='Spell Name' />	          				
	         		<FormControl componentClass='textarea' placeholder='Spell Description'/>
	          		<FormControl componentClass='input' placeholder='Casting Time'/>
          				<Row>
          					<Col md={4}>
          						<FormControl componentClass="select" multiple> {this.classSelector()} </FormControl>
          					</Col>
          					<Col  md={4} />
          					<Col md={4}>
		          				<FormGroup>
							      <InputGroup>
							        <InputGroup.Addon>
							          <input type="radio" aria-label="..." />
							        </InputGroup.Addon>
							        <FormControl type="text" placeholder="Materals Needed"/>
							      </InputGroup>
							    </FormGroup>
		          				
		          				<h5><input type="radio" label='somatic' />Somatic</h5>
		          				<h5><input type="radio" label='verbal' />Verbal</h5>
		          				<h5><input type="radio" label='ritual' />Ritual</h5>
	          				</Col>
          				</Row>
          				<FormControl componentClass='input' placeholder='duration' />
          				<FormControl componentClass='input' placeholder='range' />
          				<FormControl componentClass="select">
	        				<option value={0}>School of Magic</option>
	        				<option value={'abjuration'}>Abjuration</option>
	        				<option value={'conjuration'}>Conjuration</option>
	        				<option value={'divination'}>Divination</option>
	        				<option value={'enchantment'}>Enchantment</option>
	        				<option value={'evocation'}>Evocation</option>
	        				<option value={'illusion'}>Illusion</option>
	        				<option value={'necromancy'}>Necromancy</option>
	        				<option value={'transmutation'}>Transmutation</option>	        			
	      				</FormControl>
	      				<Button >Submit</Button>
	      			</div>
			)
	}



}

module.exports = connect(mapStateToProps , mapDispatchToProps)(SpellCreator)