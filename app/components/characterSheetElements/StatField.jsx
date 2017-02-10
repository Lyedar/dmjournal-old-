import React from 'react';
import {updateProfileAction, changeEditAction} from '../../redux/actions'
import {Button, Panel, Glyphicon, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import ChecksField from './checksField'
import PanelBuilder from '../panelBuilder'

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

//Needs to take in a Stat and an array of sub stats

export default class StatField extends React.Component {


constructor(props){
	super(props)
	this.state={
		open: false
	}
}

StatExtraDisplay(list){
	return (list.map((item)=>{
		return (<ChecksField check={item} className="black" />)
	}))
}

ToggleOpen(){
	var check = this.state.open
	this.setState({open: !check})
}

render(){
		return (
			<PanelBuilder title={this.props.stat} body={this.StatExtraDisplay(this.props.list)} />
		)
}


}

module.exports = connect(mapStateToProps, mapDispatchToProps)(StatField)  
