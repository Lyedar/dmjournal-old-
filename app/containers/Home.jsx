import React from 'react';
import 'whatwg-fetch';
import { Link, IndexLink } from 'react-router';
import {browserHistory} from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, Panel, Glyphicon, Modal, Jumbotron, Well} from 'react-bootstrap'
import {setCurrentUserAction, setUserNameAction, toggleLoginAction, setEmailAction, setPasswordAction, setConfirmPasswordAction, setErrorMessageAction, changeEditAction} from '../redux/actions'
import requestApi from '../utilities/requests'
import GroupForm from '../components/GroupForm'
import {connect} from 'react-redux'

import {Editor, EditorState} from 'draft-js';

import EditButton from '../components/ToggleEditButton'
import CharacterSheet from './CharacterSheet'
import PanelBuilder from '../components/panelBuilder'
import CantripBuilder from './CantripBuilder'
import DiceRoller from './DiceRoller'
import SpellBook from './SpellBook'
import MonsterDiary from './MonsterDiary'
import NoteMain from './Notes/NoteMain'



/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */

function mapStateToProps(state){
  return { 
  	currentUser: state.get('currentUser'),
    userName: state.get('userName'),
    email: state.get('email'),
    password: state.get('password'),
    confirmPassword: state.get('confirmPassword'),
    loggedIn: state.get('loggedIn'),
    errorMessage: state.get('errorMessage')
  }
}

function mapDispatchToProps(dispatch){
  return {
    setProfile : (profile) => dispatch(setProfileAction(profile)),
    toggleLoggin : () => dispatch(toggleLoginAction()),
    toggleEdit : () => dispatch(changeEditAction()),
    setEmail : (email) => dispatch(setEmailAction(email)),
    setPassword: (password) => dispatch(setPasswordAction(password)),
    setConfirm: (password) => dispatch(setConfirmPasswordAction(password)),
    setUserName: (userName) => dispatch(setUserNameAction(userName)),
    setUser: (user) => dispatch(setCurrentUserAction(user)),
    setError: (message) => dispatch(setErrorMessageAction(message))
  }
}
 
 class HomeView extends React.Component {

 	constructor(props){
		super(props)
		this.state={
			open: false,
			current : null
		}	
	}

	ToggleOpen(){
		var check = this.state.open
		this.setState({open: !check})
	}

 	signUpRequest(e) {
 		e.preventDefault()
 		if(this.props.confirmPassword !== this.props.password){
 			this.props.setError("Password's don't match")
 		}else{	
 			console.log('UserName: ', this.props.userName, ' Email: ', this.props.email, ' Password: ', this.props.password)
	 		requestApi('api/v1/signup', 'POST')({userName: this.props.userName, email: this.props.email, password: this.props.password})
	 		.then((response) => {
	 			console.log('SIGNUP RESPONSE: ', response)
	 			this.props.setUser(response.user.userName)
	 			requestApi('api/v1/createprofile', 'POST')({userName: this.props.userName, email: this.props.email})
	 		})
 			.then(() => {
 				requestApi('/api/v1/login', 'POST')({email:this.props.email, password:this.props.password})
 			})
 			.then(() =>{
 				this.props.toggleEdit(),
 				this.props.setEmail(''),
 				this.props.setPassword(''),
 				this.props.toggleLoggin(),
 				browserHistory.push('/profile/' + this.props.userName)
			})
 		}
 	}

 	setCurrent(element){
 		this.setState({current : element})
 	}

 	render(){ 
 		return (
 			<div className = 'centerText marginTop'>
 				<h1>Welcome to DMJournal</h1>
 				<p>A place for all your things as a DM, easy access to information about the players and your juicy plot hooks</p>
 				

				{/* Player Character Buttons */}
				<FormGroup>
					<Col md={12}><ControlLabel> Player Characters </ControlLabel></Col>
	 				<Col md={4}>
	 					<CharacterSheet character='Trave'/>
	 				</Col>
	 				<Col md={4}>
	 					<CharacterSheet character="Rider"/>
	 				</Col>
	 				<Col md={4}>
	 					<CharacterSheet character="Blane"/>
	 				</Col>
 				</FormGroup>

	 			{/* Panels of Tools */}	
	 			<Col md = {3}>	

 				<Row><Col>
 				<Button onClick={(e) => this.setCurrent(<span><CantripBuilder /></span>)}>Cantrip Builder</Button>
	 			</Col></Row>
	 			<Row><Col >
	 			<Button onClick={(e) => this.setCurrent(<span><DiceRoller /></span>)}>Dice Roller</Button>
	 			</Col></Row>
	 			<Row><Col >
	 			<Button onClick={(e) => this.setCurrent(<span><h1 className='black centerText'>NPC Generator</h1></span>)}>NPC Generator</Button>
	 			</Col></Row>	
	 			<Row><Col >
	 			<Button onClick={(e) => this.setCurrent(<span><SpellBook /></span>)}>Spell Book</Button>
	 			</Col></Row>
	 			<Row><Col >
	 			<Button onClick={(e) => this.setCurrent(<span><h1 className='black centerText'>Loot Generator</h1></span>)}>Loot Generator</Button>
	 			</Col></Row>
	 			<Row><Col >
	 			<Button onClick={(e) => this.setCurrent(<span><h1 className='black centerText'>Encounters</h1></span>)}>Encounters</Button>
	 			</Col></Row>
	 			<Row><Col >
	 			<Button onClick={(e) => this.setCurrent(<span><h1 className='black centerText'>Sound Board</h1></span>)}>Sound Board</Button>
	 			</Col></Row>
	 			<Row><Col >
	 			<Button onClick={(e) => this.setCurrent(<span><NoteMain defaultText='Hello this is a text'/></span>)}>NotePad</Button>
	 			</Col></Row>
	 			<Row><Col >
	 			<Button onClick={(e) => this.setCurrent(<span><h1 className='black centerText'>RANDOM INFO</h1></span>)}>Dm Screen</Button>
	 			</Col></Row>
	 			<Row><Col >
	 			<Button onClick={(e) => this.setCurrent(<span><MonsterDiary /></span>)}>Monster Diary</Button>
	 			</Col></Row>

	 			</Col>
	 			
	 			<Col md={9}>
	 				<Well bsSize='lg' className='scrollBackground'>{this.state.current}</Well>
    			</Col>
 			</div>

 		)
 	} 	
 }

 module.exports = connect(mapStateToProps , mapDispatchToProps)(HomeView)