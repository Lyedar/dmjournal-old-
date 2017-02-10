import React from 'react';
import {Button} from 'react-bootstrap'
import editButtonBehavior from './ToggleEditBehavior'


export default class EditButton extends React.Component {
	render(){
		return (<Button onClick = {()=>this.props.changeEdit()} bsStyle = 'primary'>{this.props.edit ? 'Stop Editing': 'Edit'}</Button>)
	}
}

module.exports = editButtonBehavior(EditButton)