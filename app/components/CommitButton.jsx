import React from 'react';
import requestApi from '../utilities/requests'
import editButtonBehavior from '../components/ToggleEditBehavior'
import getProfileBehavior from '../components/getProfileBehavior'

class CommitButtonView extends React.Component {
  updateProfile(e) {
    e.preventDefault()
    console.log('profile' , this.props.currentProfile.toJS())
    requestApi('/api/v1/updateprofile', 'PUT')(this.props.currentProfile.toJS())
      .then(this.props.changeEdit)
  }

  render(){
    console.log('profile from the commit render' , this.props.currentProfile)
    return <div className='btn btn-primary' onClick={(e)=>this.updateProfile(e)}>Commit</div>
  }
}

var CommitButton = editButtonBehavior(getProfileBehavior(CommitButtonView))

module.exports = CommitButton