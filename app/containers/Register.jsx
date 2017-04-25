import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import 'whatwg-fetch';
const cx = classNames.bind(styles);
import {browserHistory} from 'react-router';
import {Button, form, FormGroup, ControlLabel, FormControl, Col, Row, Well} from 'react-bootstrap';
import {connect} from 'react-redux'

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

export default class Register extends React.Component {
	constructor(props){
		super(props)
		this.state ={
			userName:'',
			email:'',
			password:'',
			passwordC: '',
			success:''
		}
	}

	checkInfo(){
		if(this.state.userName === ''){
			this.setState({error : "Username is blank!"})
		} else if (this.state.email === ''){
			this.setState({error : "Email is blank!"})
		} else if (this.state.password === ''){
			this.setState({error : "Password is blank!"})
		} else if(this.state.password !== this.state.passwordC){
			this.setState({error : "Passwords don't match"})
		} else {
			this.pullUser()
		}
	}

	pullUser(){
		var self = this
    var user
		fetch('/api/v1/signup', {
			credentials : 'same-origin',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email : self.state.email,
				password : self.state.password,
				userName : self.state.userName
			})
		})
		.then(function(response) {
			return response.json()
		}).then(function(json) {
      console.log(json)
      self.setState({success: json.success})
      user = json.user;
      console.log("Success: "+  success + " user: "+ user )
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		}).then(function(){
			if(self.success === true){
				browserHistory.push('/')
			}
		})
	}


	inUse(){
		if(this.state.success === "false"){
			return "This Email or Username is already in use."
		}
	}

	render(){
		var self = this
		return(
			<div>
			<Well className='darkWoodBackground marginTop centerText' >
			<br/>
			{' '}
			<br/>
			<label className = 'alertText'>{this.inUse()}</label>
			<label className = 'alertText'>{this.state.error ? this.state.error : ''}</label>
				<FormGroup className='centerText'>
					<Row>
						<Col sm={3}>
							<ControlLabel>Username:</ControlLabel>
							<FormControl placeHolder= "Enter Username" onChange={(e)=>this.setState({userName:e.target.value})}/><br />
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm={3}>
							<ControlLabel>Email:</ControlLabel>
							<FormControl type="email" placeHolder = "Enter Email" onChange={(e)=>this.setState({email:e.target.value})}/><br />
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm={3}>
							<ControlLabel>Password:</ControlLabel>
							<FormControl type="password" placeHolder= "Enter Password" onChange={(e)=>this.setState({password:e.target.value})}/><br />
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm={3}>
							<ControlLabel>Confirm Password:</ControlLabel>
							<FormControl type="password" placeHolder= "Confrim Password" onChange={(e)=>this.setState({passwordC:e.target.value})}/><br />
						</Col>
					</Row>
				</FormGroup>
			<Button onClick ={this.checkInfo.bind(this)} bsStyle = 'primary'>Sign Up</Button>
		</Well>
	</div>)
		}
	}
module.exports = connect(mapStateToProps , mapDispatchToProps)(Register)
