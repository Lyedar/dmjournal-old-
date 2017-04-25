import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
const cx = classNames.bind(styles);
import {Link} from 'react-router';
import {Button, Col, Glyphicon, Panel, FormGroup, InputGroup, FormControl, form, ControlLabel, Modal} from 'react-bootstrap'
import {setShowModal} from '../redux/actions';
import {connect} from 'react-redux'

function mapStateToProps(state, ownProps){

  return {
  	showModal: state.getIn(['modal','showModal']),
  	modalBody: state.getIn(['modal','mBody']),
  	modalHead: state.getIn(['modal','mHead']),
  	modalFooter: state.getIn(['modal', 'mFooter'])
  }

}

function mapDispatchToProps(dispatch, ownProps){
  return {
 	displayModal: (toggle) => dispatch(setShowModal(toggle)),
  }

}



class ModalBuilder extends React.Component {


	render(){
		console.log("Modal Builder Run")
		return (
			<Modal  show={this.props.showModal} bsSize = "large" onHide={()=>this.props.displayModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.modalHead}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.props.modalBody}
				</Modal.Body>
			<Modal.Footer bsClass='noLine'><span>{this.props.modalFooter}</span></Modal.Footer>
</Modal>
		)
	}

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ModalBuilder)
