import {connect} from 'react-redux'
import {setProfileUserNameAction, addProfileAction} from '../redux/actions'


function mapStateToProps(state){
  const currentUser = state.get("profileUserName");
  return { 
    currentProfile : state.getIn(["profiles", currentUser])
  }
}

function mapDispatchToProps(dispatch){
  return {
    setProfile : (profile) => {
    	dispatch(setProfileUserNameAction(profile.userName))
    	dispatch(addProfileAction(profile))
    },
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)