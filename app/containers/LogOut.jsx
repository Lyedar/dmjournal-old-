import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {connect} from 'react-redux'
import requestApi from '../utilities/requests'
import {setCurrentUserAction, toggleLoginAction, addProfileAction, setProfileUserNameAction} from '../redux/actions'
import 'whatwg-fetch';
import { Link , Button } from 'react-router';
const cx = classNames.bind(styles);
import {browserHistory} from 'react-router';

function mapStateToProps(state){
  return { 
  	currentUser: state.get('currentUser'),
    profileUserName: state.get('profileUserName'),
    email: state.get('email'),
    password: state.get('password'),
    confirmPassword: state.get('confirmPassword'),
    loggedIn: state.get('loggedIn'),
    errorMessage: state.get('errorMessage')
  }
}

function mapDispatchToProps(dispatch){
  return {
    setProfileUserName : (profile) => dispatch(setProfileUserNameAction(profile)),
    toggleLogin : () => dispatch(toggleLoginAction()),
    toggleEdit : () => dispatch(changeEditAction()),
    setCurrentUser: (user) => dispatch(setCurrentUserAction(user)),
    setError: (message) => dispatch(setErrorMessageAction(message))
  }
}
 

class LogoutView extends React.Component {



	componentWillMount(){
		console.log('Beginning log out')
		this.props.setProfileUserName('')
		console.log('Profile user', this.props.profileUserName)
        this.props.setCurrentUser('')
        console.log('CurrentUser', this.props.currentUser)
        this.props.toggleLogin()
        console.log('Login state', this.props.loggedIn)
		requestApi('/api/v1/logout')()
	}

	render(){
		return (
			<div className = 'centerText'>
				<h1 className='profileName'>UNTIL NEXT TIME</h1>
				<p>You have logged out</p>
				<Link to='/'>Return Home</Link>
			</div>
		)
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LogoutView)

