import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Form, 
		FormGroup,
		FormControl, 
		ControlLabel, 
		Col, 
		Row, 
		Button, 
		ButtonToolbar, 
		ButtonGroup, 
		option, 
		Checkbox,
		Tooltip,
		OverlayTrigger
	} from 'react-bootstrap'
import {changeAvailabiltyAction} from '../redux/actions'
import {connect} from 'react-redux'

function mapStateToProps(state, ownprops){
	var currentUser = state.get('currentUser')
	var userName = ownprops.userName || currentUser

	return{
		availability: state.getIn(["profiles", userName, "availability"]),
		userAvailability:  state.getIn(["profiles", currentUser , "availability"]),
		userName, 
		currentUser,
		edit: state.get('edit')
	}
}

function mapDispatchToProps(dispatch){
	return{
		setAvailability: (day, time, available) => dispatch(changeAvailabiltyAction(day, time, available))
	}
}

export default class CantripBuilder extends React.Component {

	constructor(props){
		super(props)
		this.state={
			melee: true,
			ranged : false, 
			AoEButton: false,
			SEoTButton: false,
			Damage : 0,
			Save : 0,
			Range : 0,
			Area : 0,
			Special : 0,
			results : null
		}
	}

	runBuilder() {
		var results = Number(this.state.Damage) + Number(this.state.Save) + Number(this.state.Range) + Number(this.state.Area) + Number(this.state.Special) 
		console.log('Before d12 change: ' + results)
		results = 12 + (2 * results)
		console.log('After d12 change: ' + results)
		document.getElementById('results').value = 'If the cantrip does damage or healing you\'d roll a D' + results 
	}

	changeButtonActive(button){

		console.log('Button changing ' + button)
		var self = this
		var obj = {}
		obj[button] = !self.state[button]
		self.setState(obj)

		if(button === 'melee'){
			this.setState({ranged : false})
		}
			
		if(button === 'ranged'){
			this.setState({'melee' : false})
		}

	}

	setValue(target, value, id) {
		var self = this
		if(id) {
			self.changeButtonActive(id) 
		}	
		var idActive = this.state[id]
		console.log('Editing: ' + target + ' to ' + value)
		switch(target){
			case 'Damage' :
				self.setState({Damage : value});
				break;
			case 'Save' :
				self.setState({Save : value});
				break;
			case 'Range' :
				self.setState({Range : value});
				break;
			case 'Area' : 
				if(!idActive){
					self.setState({Area : value});
				}else{
					self.setState({Area : 0})
				}
				break;
			case 'Special' :
				if(!idActive){
					self.setState({Special : value});
				}else{
					this.setState({Special : 0})
				}
				break;	
		}
	}


	render() {
		var self = this
		 var damageTip = (
		 		<Tooltip id='damageTip'> The Damage type the cantrip does, if damage is delt</Tooltip>
		 	);
		var saveTip = (
		 		<Tooltip id='saveTip'>If the cantrip requires a saving throw</Tooltip>
		 	);
		var rangeTip = (
		 		<Tooltip id='rangeTip'>Must the attacker be in melee range (&lt;5 ft) or at range?</Tooltip>
		 	);
		var areaTip = (
		 		<Tooltip id='areaTip'>Does the cantrip hit a wide area? (More then 1 target)</Tooltip>
		 	);
		var specialTip = (
		 		<Tooltip id='specialTip'>Does the cantrip add a special affect to the target or user? (Advantage, posioned, blindness, etc. etc.)</Tooltip>
		 	); 		 

		return(
			<Row>
				<Col md={6}>
				 	<FormGroup controlId="damageTypeSelect">
	     				<OverlayTrigger placement='bottom' overlay={damageTip}>
	     					<ControlLabel className='black'>Damage Type</ControlLabel>
	      				</OverlayTrigger>
	      				<FormControl componentClass="select" onChange={(e)=> self.setValue('Damage' , e.target.value)}>
	        				<option value={0}>None</option>
	        				<option value={0}>Fire</option>
	        				<option value={0}>Cold</option>
	        				<option value={0}>Poison</option>
	        				<option value={-1}>Necrotic</option>
	        				<option value={-1}>Thunder</option>
	        				<option value={-1}>Foce</option>
	        				<option value={-1}>Magical</option>
	      				</FormControl>
					</FormGroup>
	    		</Col>	
	    		<Col md={6}>
				 	<FormGroup controlId="saveSelect">
				 		<OverlayTrigger placement='bottom' overlay={saveTip}>
	     					<ControlLabel className='black'>Save</ControlLabel>
	     				</OverlayTrigger>	
	      				<FormControl componentClass="select" onChange={(e)=> self.setValue('Save' , e.target.value)}>
	        				<option value={0}>None</option>
	        				<option value={0}>Strength</option>
	        				<option value={0}>Dexterity</option>
	        				<option value={0}>Constitution</option>
	        				<option value={-1}>Intelligence</option>
	        				<option value={-1}>Wisdom</option>
	        				<option value={-1}>Charisma</option>
	      				</FormControl>
					</FormGroup>
	    		</Col>

	    		<Col md={6}>
		    		<ButtonToolbar controlId='RangeSelect' className='centerText'>
		    			<OverlayTrigger placement='bottom' overlay={rangeTip}>
			    			<ButtonGroup>
			    				<Button id='melee'  active={self.state.melee} className='black centerText' bsSize='small' value={0} onClick={(e)=> self.setValue('Range' , e.target.value, e.target.id)}> Melee </Button>
			    				<Button id='ranged' active={self.state.ranged} className='black centerText' bsSize='small' value={-1} onClick={(e)=> self.setValue('Range' , e.target.value, e.target.id)}> Ranged </Button>
			    			</ButtonGroup>	
		    			</OverlayTrigger>
		    		</ButtonToolbar>
	    		</Col>
	    		<Row>
	    		<Col md={6}>
	    			<OverlayTrigger placement='bottom' overlay={areaTip}>
		    			<Button id='AoEButton' active={self.state.AoEButton} className='black centerText' value={-1} onClick={(e)=> self.setValue('Area' , e.target.value, e.target.id)}> Area of Affect </Button>
		    		</OverlayTrigger>	
	    		</Col>

	    		<Col md={12}>
	    			<OverlayTrigger placement='bottom' overlay={specialTip}>
	    				<Button id='SEoTButton' active={self.state.SEoTButton} className='black centerText' value={-1} onClick={(e)=> self.setValue('Special' , e.target.value, e.target.id)}> Special Effect on Targets </Button>
	    			</OverlayTrigger>	
	    		</Col>
	    		</Row>
	    		<FormControl id='results' componentClass='textarea' className='black noWidthResize centerText' placeholder='Results' value={self.state.results ? self.state.results : ''}/>
	    		<br/>
	    		<Button onClick={self.runBuilder.bind(self)}>Create Cantrip</Button>
			</Row>
		)
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(CantripBuilder)