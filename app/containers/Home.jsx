import React from 'react';
import 'whatwg-fetch';
import { Link, IndexLink } from 'react-router';
import {browserHistory} from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, Panel, Glyphicon, Modal} from 'react-bootstrap'
import {setCurrentUserAction, setUserNameAction, toggleLoginAction, setEmailAction, setPasswordAction, setConfirmPasswordAction, setErrorMessageAction, changeEditAction} from '../redux/actions'
import requestApi from '../utilities/requests'
import GroupForm from '../components/GroupForm'
import {connect} from 'react-redux'

import EditButton from '../components/ToggleEditButton'
import CharacterSheet from './CharacterSheet'
import PanelBuilder from '../components/panelBuilder'
import CantripBuilder from './CantripBuilder'
import DiceRoller from './DiceRoller'
import SpellBook from './SpellBook'
import MonsterDiary from './MonsterDiary'



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
			open: false
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

 	render(){ 
 		return (
 			<div className = 'centerText marginTop'>
 				<h1>Welcome to DMJournal</h1>
 				<p>A place for all your things as a DM, easy access to information about the players and your juicy plot hooks</p>
 				

 					{/* Player Character Buttons */}

	 				<Col md={4}>
	 					<CharacterSheet character='Trave'/>
	 				</Col>
	 				<Col md={4}>
	 					<CharacterSheet character="Rider"/>
	 				</Col>
	 				<Col md={4}>
	 					<CharacterSheet character="Blane"/>
	 				</Col>
	 				<br/>	
	 				<br/>

	 				{/* Panels of Tools */}	
		 			<Row>
		 				<Col md={4}>
			 			<PanelBuilder
			 				title="Cantrip Gen"
			 				body={(<span><CantripBuilder /></span>)}	
			 			/>
			 			</Col>
			 			<Col md={4}>
			 			<PanelBuilder
			 				title='Dice Roll'
			 				body={(<span><DiceRoller /></span>)}	
			 			/>
			 			</Col>
			 			<Col md={4}>
			 			<PanelBuilder
			 				title='NPC Generator'
			 				body={(<span><h1 className='black centerText'>NPC Generator</h1></span>)}	
			 			/>
			 			</Col>
			 		</Row>
			 		<Row>	
			 			<Col md={4}>
			 			<PanelBuilder
			 				title='Spell Book'
			 				body={(<span><SpellBook /></span>)}	
			 			/>
			 			</Col>
			 			<Col md={4}>
			 			<PanelBuilder
			 				title='Loot Generator'
			 				body={(<span><h1 className='black centerText'>Loot Generator</h1></span>)}	
			 			/>
			 			</Col>
			 			<Col md={4}>
			 			<PanelBuilder
			 				title='Encounters'
			 				body={(<span><h1 className='black centerText'>Encounters</h1></span>)}	
			 			/>
			 			</Col>
			 		</Row>
			 		<Row>	
			 			<Col md={4}>
			 			<PanelBuilder
			 				title='Sound board'
			 				body={(<span><h1 className='black centerText'>Sound Board</h1></span>)}	
			 			/>
			 			</Col>
			 			<Col md={4}>
			 			<PanelBuilder
			 				title='Note Box'
			 				body={(<span><h1 className='black centerText'>NOTES</h1></span>)}	
			 			/>
			 			</Col>
			 			<Col md={4}>
			 			<PanelBuilder
			 				title='DM Screen'
			 				body={(<span><h1 className='black centerText'>RANDOM INFO</h1></span>)}	
			 			/>
			 			</Col>
			 			<Col md={4}>
			 			<PanelBuilder
			 				title='Monster Manual'
			 				body={(<span><MonsterDiary /></span>)}	
			 			/>
			 			</Col>
			 		</Row>	
 			</div>

 		)
 	} 	
 }

 module.exports = connect(mapStateToProps , mapDispatchToProps)(HomeView)