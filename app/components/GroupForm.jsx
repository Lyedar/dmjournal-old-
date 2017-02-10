import React from 'react'
import {Col, FormGroup, FormControl} from 'react-bootstrap'


class GroupForm extends React.Component{
	render(){
		return <FormGroup controlId = {this.props.id}>
			<Col componentClass ='ControlLabel' sm = {2} md = {2}>
				{this.props.label}
			</Col>
			<Col sm = {4} md = {4}>
				<FormControl 
					type = {this.props.type}
					placeholder = {this.props.placeholder} 
					onChange = {(e)=>this.props.update(e.target.value)}
				/>
			</Col>
		</FormGroup>
	}
}

module.exports = GroupForm