import React, { Component, PropTypes } from 'react';
import Navigation from 'containers/Navigation';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/main';
import {setUserAction, addProfileAction, setCurrentUserAction, loginTrueAction} from '../redux/actions';
import requestApi from '../utilities/requests';
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />

const cx = classNames.bind(styles);

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */

function mapStateToProps(state){
  return { 
    currentUser : state.getIn(["currentUser", "userName"])
  }
}

function mapDispatchToProps(dispatch){
  return {
    setUser : (userName) => dispatch(setCurrentUserAction(userName)),
    addProfile: (user) => dispatch(addProfileAction(user)),
    loginTrue : () => {
                        const action = loginTrueAction()
                        console.log('log in, so true', action)
                        return dispatch(action)
                      }
  }
}

export default class App extends Component {
  

   componentWillMount(){
    console.log('App restart')
    this.getUser()
  }

   getUser() {
    requestApi('/api/v1/getuser')()
      .then((user) => {
        if(user.loggedIn) {
          requestApi('/api/v1/getprofile/' + user.userName)()
            .then((profile)=>{
              this.props.setUser(profile.userName)
              this.props.addProfile(profile)
              this.props.loginTrue()
            })
        } else {
          this.props.setUser({})
        }
      })
   }


  render() {
    return (
      <div className={cx('app')}>
        <Navigation user={this.props.currentUser} />
        {this.props.children}
      </div>
    );
  }
};

App.propTypes = {
  children: PropTypes.object
};

module.exports = connect(mapStateToProps , mapDispatchToProps)(App)