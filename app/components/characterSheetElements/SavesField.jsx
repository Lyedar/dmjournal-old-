import React from 'react';
import {updateProfileAction} from '../../redux/actions'
import {Button, Alert} from 'react-bootstrap'
import {connect} from 'react-redux'


function mapStateToProps(state, ownProps){
  var profileUserName = state.get('profileUserName')
  return {
    edit : state.get('edit'),
    value: state.getIn(['profiles', profileUserName, ownProps.field]),
  }

}

function mapDispatchToProps(dispatch, ownProps){
  return {
    updateProfile : (value) => dispatch(updateProfileAction(ownProps.field, value)),
    addToList : (list, item) => dispatch(addToListAction(list, item)),
    deleteFromList : (list, item) => dispatch(deleteFromListAction(list, item))
  }

}

export default class SavesView extends React.Component {

  constructor(props){
    super(props)
    this.state={
      alert: false,
      count: 0
    }
  } 


  subtractAlert(){
    var count = this.state.count - 1
    this.setState({count: count})
    if(count < 3){
      this.setState({alert: false})
    }
  }

  addAlert(){
    var count = this.state.count + 1
    this.setState({count: count})
    if(count === 3){
      this.setState({alert: true})
    }
  }

  dismissAlert(){
    this.setState({count : 0});
    document.getElementById('first' + this.props.onFull).checked = false;
    document.getElementById('second' + this.props.onFull).checked = false;
    document.getElementById('third' + this.props.onFull).checked = false;
    this.setState({alert: false});
  }


  render(){
    var self = this
      return  (
        <span className = 'black' >
        {this.state.alert ? (<Alert bsStyle='danger' onDismiss={this.dismissAlert.bind(this)}><h4>{this.props.onFull}!</h4></Alert>) : (<span/>)}
        {this.props.label}: <input id = {'first' + this.props.onFull} type = 'checkbox' onChange={(e) => { e.target.checked ? self.addAlert() : self.subtractAlert()}}/><input id = {'second' + this.props.onFull} type = 'checkbox' onChange={(e)=> {e.target.checked ? self.addAlert() : self.subtractAlert()}}/><input id = {'third' + this.props.onFull} type = 'checkbox' onChange={(e)=> {e.target.checked ? self.addAlert() : self.subtractAlert()}}/>
        </span>
      )
  }


}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SavesView) 