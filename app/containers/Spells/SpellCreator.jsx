import React from 'react';
import classNames from 'classnames/bind';
import {Modal,
	Form, FieldGroup, FormControl,
	ControlLabel,
	Col, Row,
	Button, Help, Table,
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
  	return {
  		showCreate: state.getIn(['createSpell', 'show']),
  		spell: state.get('spellSelected'),
	    userName: state.get('userName'),
	    profiles : state.get('profiles').toJS(),
	    edit : state.get('edit')
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
 		this.state={
 			spellName: '',
 			spellDesc: '',
 			spellCT: '',
			spellLevel: '',
 			spellClasses: [],
 			spellSomatic: false,
 			spellVerbal: false,
 			spellRitual: false,
 			spellDuration: '',
 			spellRange: '',
 			spellSchool: '',
 			spellCreator: this.props.userName,
			materialsCheck: false,
			spellMaterials: ''
 		};
 	}

 	classSelector(){
 		var classes = dndDefaults.CLASSES //+ DM's custom classes if any
 		var newClasses = classes.map(function(curr){
 			return (<option value={curr} key={curr}> {curr} </option>)
 		})
 		return newClasses;
 	}

 	onClassChange(e){
	 	var options = e.target.options;
		var value = [];
	 	for (var i = 0, l = options.length; i < l; i++) {
	   		if (options[i].selected) {
	      		value.push(options[i].value);
	   		}
	  	}
	  	this.setState({spellClasses : value})
	}


	submitButton(){
		requestApi('/api/v1/createspell', 'POST')(this.state)
		.then((response)=>{
			console.log(response)
		})
	}

	render(){
		return(
			<div className='centerText black'>
				<FormControl onChange={(e) => this.setState({ spellName :e.target.value})} componentClass="input" placeholder='Spell Name' />
   			<FormControl onChange={(e) => this.setState({ spellDesc:e.target.value})} className= 'noWidthResize ' componentClass='textarea' placeholder='Spell Description'/>
    		<FormControl onChange={(e) => this.setState({ spellCT:e.target.value})} componentClass='input' placeholder='Casting Time'/>
				<FormControl onChange={(e) => this.setState({ spellLevel:e.target.value})} componentClass='input' placeholder='Level' />
				<Row>
					<Col md={4}>
						<FormControl onChange={(e)=> this.onClassChange(e) } componentClass="select" multiple> {this.classSelector()} </FormControl>
					</Col>
					<Col  md={4} />
					<Col md={4}>
      				<FormGroup>
			      <InputGroup>
			        <InputGroup.Addon>
			          <input type="radio" checked={this.state.materialsCheck} onClick={(e)=> this.setState({materialsCheck : !this.state.materialsCheck})} />
			        </InputGroup.Addon>
			        <FormControl type="text" value={this.state.spellMaterials} onChange ={(e)=> this.setState({spellMaterials : e.target.value})} placeholder="Materials Needed"/>
			      </InputGroup>
			    </FormGroup>

      				<h5><input type="radio" label='somatic' checked={this.state.spellSomatic} onClick={(e)=> this.setState({spellSomatic : !this.state.spellSomatic})}/>Somatic</h5>
      				<h5><input type="radio" label='verbal' checked={this.state.spellVerbal} onClick={(e)=> this.setState({spellVerbal : !this.state.spellVerbal})} />Verbal</h5>
      				<h5><input type="radio" label='ritual' checked={this.state.spellRitual} onClick={(e)=> this.setState({spellRitual : !this.state.spellRitual})} />Ritual</h5>
    				</Col>
				</Row>
				<FormControl onChange={(e) => this.setState({ spellDuration :e.target.value})} componentClass='input' placeholder='duration' />
				<FormControl onChange={(e) => this.setState({ spellRange :e.target.value})} componentClass='input' placeholder='range' />
				<FormControl onChange={(e) => this.setState({ spellSchool :e.target.value})} componentClass="select">
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
				<Button onClick={(e)=>this.submitButton()} >Submit</Button>
		</div>
			)
	}



}

module.exports = connect(mapStateToProps , mapDispatchToProps)(SpellCreator)
