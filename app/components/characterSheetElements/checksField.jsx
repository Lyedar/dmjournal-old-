import React from 'react';
import {updateProfileAction, changeEditAction} from '../../redux/actions'
import {Button, Panel, Glyphicon, Col, FormControl} from 'react-bootstrap'
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
    deleteFromList : (list, item) => dispatch(deleteFromListAction(list, item)),
    toggleEdit : () => dispatch(changeEditAction())
  }

}

//Needs to take in a Check Value

export default class ChecksField extends React.Component {

render(){
		return (<span className='black'>
			<Col md={7}>{this.props.check}</Col>
			<Col md={5}><FormControl className = 'centerText' placeHolder={this.props.check}/></Col>
			<br/>
		</span>)
}


}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ChecksField)  
