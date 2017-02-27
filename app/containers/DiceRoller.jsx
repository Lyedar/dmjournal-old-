import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {form, 
		FormGroup,
		FormControl,
		FieldGroup, 
		ControlLabel, 
		Col, 
		Row, 
		Button, 
		ButtonToolbar, 
		ButtonGroup, 
		InputGroup,
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

export default class DiceRoller extends React.Component {

	constructor(props){
		super(props)
		this.state={
			rolls : '',
			amount: 1
		}
	}

	rollDie(die , percentile){
		die ? die = die : die = 0
		var amount = this.state.amount
		var allRolls = this.state.rolls.split('\n')
		var value
		// set text color back to original
		document.getElementById('response').style.color= 'black'

		//Check if dice has a value, is a percentile dice or has defaults values
		if(die === 0){
			value = 'No Die number given'
		} else if(percentile){
			var roll = (Math.floor(Math.random() * die) + 1);
			value = 'Percent: ' + roll + '\n'
		}else{
			var roll = amount * (Math.floor(Math.random() * die) + 1);
			value = amount+ 'D' + die + ' rolled a ' + roll
		}	

		//adds new roll to array, turns array back into string with \n splits and sets the state back
		allRolls.unshift(value)
		allRolls = allRolls.join('\n')
		this.setState({rolls: allRolls})

		//Colors text to green or red if dice hit max or 1 on last roll
		if(roll == die ){
			document.getElementById('response').style.color = 'green'
		}
		if(roll === 1){
			document.getElementById('response').style.color = 'red'
		}
	}


	render() { 

		return(
			<span>
				
				<Col md={4} mdOffset={4}>
				<ControlLabel># of Dice</ControlLabel>
				<FormControl id='amount' componentClass='input' className='black noWidthResize centerText' value={this.state.amount} onChange={(e)=> this.setState({amount : e.target.value})} />
  				</Col>
 				<br/>
 				<Col md={12}><ControlLabel>Quick Rolls</ControlLabel></Col>
				<Col md={12}>
					<Button onClick={(e)=> this.rollDie(e.target.value)} value = {20} >D20</Button>
					<Button onClick={(e)=> this.rollDie(e.target.value)} value = {12}>D12</Button>
					<Button onClick={(e)=> this.rollDie(e.target.value)} value = {10}>D10</Button>
					<Button onClick={(e)=> this.rollDie(e.target.value)} value = {8}>D8</Button>
					<Button onClick={(e)=> this.rollDie(e.target.value)} value = {6}>D6</Button>
					<Button onClick={(e)=> this.rollDie(e.target.value)} value = {4}>D4</Button>
				</Col>

				<Col md={12}>
					<Button onClick={(e)=> this.rollDie(e.target.value, true)} value = {100}>% Dice </Button>
				</Col>

				<Col md={12}>
				<ControlLabel>Custom Dice</ControlLabel>
					<FormGroup>
				      <InputGroup>
				        <InputGroup.Button>
				          <Button onClick={()=> this.rollDie(document.getElementById('customDieValue').value)} >Roll D</Button>
				        </InputGroup.Button>
				        <FormControl id='customDieValue' type="text" />
				      </InputGroup>
				    </FormGroup>
				</Col>  

			<FormControl id='response' componentClass='textarea' className='black noWidthResize minHeight centerText' placeholder='Results' value = {this.state.rolls}/>
			<Button onClick={()=>this.setState({rolls : ''})}>Clear Roll History</Button>
			</span>		
			
		)
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(DiceRoller)