import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
const cx = classNames.bind(styles);
import {Link} from 'react-router';
import {Button, Col, Glyphicon, Panel, FormGroup, InputGroup, FormControl, form, ControlLabel} from 'react-bootstrap'
import {connect} from 'react-redux'

function mapStateToProps(state, ownProps){
	var currentUser = state.get('currentUser')
	var userName = ownProps.userName || currentUser
  return {
  	userName,
    edit : state.get('edit'),
    description : _.get(state.get('profiles').toJS(), `${userName}.description`, 'No Description Available')
  }

}

function mapDispatchToProps(dispatch, ownProps){
  return {
 	updateProfile : (value) => dispatch(updateProfileAction('description', value))
  }

}



class PanelBuilder extends React.Component {
	
	constructor(props){
		super(props)
		this.state={
			open: false
		}
	}

	ToggleOpen(){
		var check = this.state.open
		this.setState({open: !check})
	}

	render(){
		var Header = (<span> <Col md={9}> <span className="black" > {this.props.title} </span> </Col> <Col md={3}><Glyphicon glyph={this.state.open ? 'chevron-up' : 'chevron-down' }  onClick={this.ToggleOpen.bind(this)} /> </Col> <br/></span>)
		return (
			<Panel collapsible expanded={this.state.open} header={Header}>
				{this.props.body}
			</Panel>	
		) 
	}	

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(PanelBuilder)