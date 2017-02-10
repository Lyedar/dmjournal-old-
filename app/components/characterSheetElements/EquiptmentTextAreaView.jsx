import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
const cx = classNames.bind(styles);
import {updateProfileAction} from '../../redux/actions'
import {Link} from 'react-router';
import {Button, Col, Glyphicon, Panel, FormGroup, InputGroup, FormControl, form, ControlLabel} from 'react-bootstrap'
import {connect} from 'react-redux'
import PanelBuilder from '../panelBuilder'

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



class EquiptmentTextAreaView extends React.Component {
	
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

	auto_grow(element) {
    	element.style.height = "5px";
    	element.style.height = (element.scrollHeight+20)+"px";
	}

	mapAll(){
		return this.props.equiptment.map((item)=>(
			<FormGroup>
				<Col md={12}>
			      <InputGroup className="fullBack">
			        <InputGroup.Addon className="noLine" >
			          <input className="noLine"  type="checkbox"/>
			        </InputGroup.Addon>
			        <ControlLabel className = "black"><span className="centerText">{item}  GP: </span></ControlLabel>
			        <FormControl onKeyUp={(e)=>this.auto_grow(e.target)} className="black transparent noWidthResize" wrap="soft" componentClass="textarea" placeHolder="Text Here"/>
			      </InputGroup>
			    </Col> 
			</FormGroup>
			))
	}

	render(){
		
		return (
			<PanelBuilder 
				title = {this.props.head}
				body={(<span>
					{this.mapAll()}
					<Button bsStyle="danger">Delete Selected</Button>)} />
				</span>)}
			/>		
		) 
	}	

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EquiptmentTextAreaView)