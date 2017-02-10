import React from 'react';
import {updateProfileAction} from '../../redux/actions'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'

function mapStateToProps(state, ownProps){
  var profileUserName = state.get('profileUserName')
  return {
    edit : state.get('edit')
  }

}

function mapDispatchToProps(dispatch, ownProps){
  return {
    updateProfile : (value) => dispatch(updateProfileAction(ownProps.field, value)),
    addToList : (list, item) => dispatch(addToListAction(list, item)),
    deleteFromList : (list, item) => dispatch(deleteFromListAction(list, item))
  }

}



export default class FieldView extends React.Component {
  render(){
      return(<span>
        <span className='black'>{this.props.label}:</span>
        <input size={10} className="black Center transparentInput" type = 'text' onChange={(e) => this.props.updateProfile(e.target.value)} value = {this.props.value}/>
      </span>)
  }


}

module.exports = connect(mapStateToProps, mapDispatchToProps)(FieldView)  
