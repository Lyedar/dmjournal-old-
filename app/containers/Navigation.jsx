import React, { Component, PropTypes } from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import requestApi from '../utilities/requests'
import {setCurrentUserAction, toggleLoginAction, setEmailAction, setPasswordAction, addProfileAction, setProfileUserNameAction} from '../redux/actions'
const cx = classNames.bind(styles);
const {Header, Brand} = Navbar


function mapStateToProps(state, ownProps){
  return {
    edit : state.get('edit'),
    currentUser : state.get('currentUser'),
    email: state.get('email'),
    password: state.get('password'),
    loggedIn: state.get('loggedIn')
  }

}

function mapDispatchToProps(dispatch, ownProps){
  return {
    setCurrentUser : (user) => dispatch(setCurrentUserAction(user)), 
    addProfile: (profile) => dispatch(addProfileAction(profile)),
    toggleLogin: () => dispatch(toggleLoginAction()), 
    setEmail: (value) => dispatch(setEmailAction(value)), 
    setPassword: (value) => dispatch(setPasswordAction(value)),
    setProfileUserName: (name)=> dispatch(setProfileUserNameAction(name))
  }

}




class NavigationView extends Component {  


  dropDown(){
    if(this.props.currentUser){
      return(
        <NavDropdown eventKey={2} title= {this.props.currentUser} id = "user-drop-down">
          <MenuItem eventKey={2.1} ><Link to={/profile/ + this.props.currentUser}><span onClick={()=>this.props.setProfileUserName(this.props.currentUser)} >Profile</span></Link></MenuItem>
          <MenuItem eventKey={2.3}><Link to="/logout">Log Out</Link></MenuItem>  
        </NavDropdown> 
      )     
    } else {
      return <NavItem eventKey={2}><Link to="/login">Login</Link></NavItem>  
    }
  }

  loginDisplay() {
    var self = this
    return (
      <Form inline className="marginTop black alignRight">
        <FormGroup controlId = 'email' >
            <ControlLabel>Email</ControlLabel>
            {' '}
            <FormControl type = 'email' placeholder = 'Email' onChange= {(e)=> self.props.setEmail(e.target.value)}/>
        </FormGroup>
        {' '}
        <FormGroup>
            <ControlLabel>Password</ControlLabel>
            {' '}
            <FormControl type = 'password' placeholder = 'Password' onChange = {(e)=> self.props.setPassword(e.target.value)} />
        </FormGroup>
        {' '}
        <Button  onClick={::self.loginReq} >Login</Button>
      </Form>
    )
  }

  loginReq() {
    requestApi('/api/v1/login', 'POST')({email: this.props.email , password: this.props.password})
      .then(loginSuccess=>
        {
          if(loginSuccess.success){
            requestApi('/api/v1/getprofile/'+loginSuccess.user.userName)()
              .then((profile)=>{
                this.props.setPassword('')
                this.props.setEmail('')
                this.props.setProfileUserName(profile.userName)
                this.props.addProfile(profile)  
                this.props.setCurrentUser(loginSuccess.user.userName)
                this.props.toggleLogin()
               browserHistory.push('/profile/' + loginSuccess.user.userName)
              }) 
          } else {
            alert('Login failed. You should feel bad.')
          }
        })
  }

  isLoggedIn(){
    if(this.props.loggedIn){
      return(
        <div>
        {this.dropDown()}
        <NavItem eventKey={3}><Link to='/search'>Search</Link></NavItem>
        </div>
        )
    }else{
      return (
        <div>
        {::this.loginDisplay()}
        </div>
        )
      }
    }

  render() {
    return (
      <Navbar className={"navbar-fixed-top"} fluid = {true}>
        <Header>
          <Brand>
            DM Journal
          </Brand>
        </Header>
        <Nav>
          <Form>
            <FormGroup>
              <ControlLabel className = {'black'}>Navigation Here</ControlLabel>
            </FormGroup>  
          </Form>  
        </Nav>
      </Navbar>
      );
  }
}



module.exports = connect(mapStateToProps , mapDispatchToProps)(NavigationView)