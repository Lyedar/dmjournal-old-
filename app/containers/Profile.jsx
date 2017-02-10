import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Link, IndexLink, browserHistory} from 'react-router';
import {connect} from 'react-redux'
import {Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock} from 'react-bootstrap'
import _ from 'lodash';
const cx = classNames.bind(styles);
import requestApi from '../utilities/requests'
import ToggleEditButton from '../components/ToggleEditButton'
import {ProfileListField, ProfileCheckboxField, ProfileTextAreaField} from '../components/characterSheetElements'
import {setProfileUserNameAction, changeEditAction, addProfileAction, setSuggestionsAction, setErrorMessageAction, setDescriptionAction} from '../redux/actions'
import editButtonBehavior from '../components/ToggleEditBehavior'
import getProfileBehavior from '../components/getProfileBehavior'
import CommitButton from '../components/CommitButton'


function mapStateToProps(state){
  var profileUserName = state.get("profileUserName")
  return { 
    profileUserName,
    loggedIn: state.get('loggedIn'),
    currentUser: state.get('currentUser'),
    profile: state.getIn(['profiles', profileUserName]),
    profiles: state.get('profiles'), 
    host: state.getIn(['profiles', profileUserName, 'host']),
    dungeonMaster: state.getIn(['profiles', profileUserName, "dungeonMaster"]),
    player:  state.getIn(['profiles', profileUserName, "player"]),
    edit : state.get("edit"),
    errorMessage: state.get('errorMessage')
  }
}

function mapDispatchToProps(dispatch){
  return {
    setProfileUserName : (userName) => dispatch(setProfileUserNameAction(userName)),
    changeEdit : () => dispatch(changeEditAction()),
    addProfile : (profile) => dispatch(addProfileAction(profile)),
    setSuggestions : (suggestions) => dispatch(setSuggestionsAction(suggestions)),
    setErrorMessage: (message) => dispatch(setErrorMessageAction(message))
  }
}


class ProfileView extends React.Component {

 whosProfile() {
  requestApi('/api/v1/getprofile/' + this.props.params.slug)()
    .then((profile)=>{
      if(profile){
        this.props.setErrorMessage(false)
        this.props.setProfileUserName(profile.userName)
        this.props.addProfile(profile)
      }else{
        this.props.setErrorMessage('No Profile')
      }
    })
 }

  componentWillUpdate(newProps){
    if(newProps.params.slug !== newProps.profileUserName || !newProps.profileUserName && newProps.currentUser){
      this.whosProfile()
    }
  }

  componentWillMount(){
    if(this.currentUser){
      console.log('meep')
    this.whosProfile()
    }
  }

  render() {
    console.log('Am i logged in?', this.props)
    const profileUserName = this.props.profileUserName
    const currentUser = this.props.currentUser
    const partyLength = _.get(this.props.profiles.toJS(), `${currentUser}.party`, []).length
    if(!this.props.errorMessage){
      return (
        <div className = 'container-fluid marginTop centerText profileCD'>
          <br/>
          <br/>
          <br/>
          <br/>
          <h3>Hello World</h3>
        </div>)
    }


  }
};



module.exports = connect(mapStateToProps , mapDispatchToProps)(ProfileView)