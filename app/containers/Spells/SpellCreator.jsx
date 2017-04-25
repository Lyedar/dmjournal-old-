import React from 'react';
import classNames from 'classnames/bind';
import {Modal,
	Form, FieldGroup, FormControl,
	ControlLabel,
	Col, Row,
	Button, Help, Table,
	Well,
	FormGroup,
	InputGroup,
	Glyphicon

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
				<Row>
					<Col md={6}>
						<FormControl componentClass='input' className="centerText" onChange={(e) => this.setState({spellName :e.target.value})}  placeholder='Spell Name' />
		    		<FormControl componentClass='input' className="centerText" onChange={(e) => this.setState({spellCT:e.target.value})}  placeholder='Casting Time'/>
						<FormControl componentClass='input' className="centerText" onChange={(e) => this.setState({spellLevel:e.target.value})}  placeholder='Level' />
						<FormControl componentClass='input' className="centerText" onChange={(e) => this.setState({ spellDuration :e.target.value})}  placeholder='duration' />
						<FormControl componentClass='input' className="centerText" onChange={(e) => this.setState({ spellRange :e.target.value})}  placeholder='range' />
					</Col>
					<Col md={6}>
						<FormControl componentClass='textarea' onChange={(e) => this.setState({spellDesc:e.target.value})} className='form-control noWidthResize'  placeholder='Spell Description'/>
					</Col>
			</Row>
				<Row>
					<Col md={4}>
						<ControlLabel>Classes</ControlLabel>
						<FormControl onChange={(e)=> this.onClassChange(e) } componentClass="select" multiple> {this.classSelector()} </FormControl>
					</Col>
					<Col  md={4}>
						<ControlLabel>School of Magic</ControlLabel>
						<FormControl onChange={(e) => this.setState({ spellSchool :e.target.value})} componentClass="select">
		  				<option value={'abjuration'}>Abjuration</option>
		  				<option value={'conjuration'}>Conjuration</option>
		  				<option value={'divination'}>Divination</option>
		  				<option value={'enchantment'}>Enchantment</option>
		  				<option value={'evocation'}>Evocation</option>
		  				<option value={'illusion'}>Illusion</option>
		  				<option value={'necromancy'}>Necromancy</option>
		  				<option value={'transmutation'}>Transmutation</option>
						</FormControl>
					</Col>
					<Col md={4}>
      			<FormGroup>
							<ControlLabel>Casting</ControlLabel>
				      <InputGroup>
				        <InputGroup.Addon>
				          <input type="radio" checked={this.state.materialsCheck} onClick={(e)=> this.setState({materialsCheck : !this.state.materialsCheck})} />
				        </InputGroup.Addon>
				        <FormControl type="text" value={this.state.spellMaterials} onChange ={(e)=> this.setState({spellMaterials : e.target.value})} placeholder="Materials Needed"/>
				      </InputGroup>
							<h5 label='somatic' onClick={(e)=> this.setState({spellSomatic : !this.state.spellSomatic})} > Somatic {this.state.spellSomatic ? <Glyphicon className = "green" glyph="ok"/> : <Glyphicon className = "red" glyph="remove"/>}</h5>
      				<h5 label='verbal' onClick={(e)=> this.setState({spellVerbal : !this.state.spellVerbal})} > Verbal {this.state.spellVerbal ? <Glyphicon className = "green" glyph="ok"/> : <Glyphicon className = "red" glyph="remove"/>}</h5>
      				<h5 label='ritual' onClick={(e)=> this.setState({spellRitual : !this.state.spellRitual})} > Ritual {this.state.spellRitual ? <Glyphicon className = "green" glyph="ok"/> : <Glyphicon className = "red" glyph="remove"/>}</h5>
						</FormGroup>
    			</Col>
				</Row>


				<Button onClick={(e)=>this.submitButton()} >Submit</Button>
		</div>
			)
	}



}

module.exports = connect(mapStateToProps , mapDispatchToProps)(SpellCreator)
