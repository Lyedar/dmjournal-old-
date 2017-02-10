import React from 'react';
import {addToListAction, deleteFromListAction} from '../../redux/actions'
import {Link} from 'react-router';
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'

function mapStateToProps(state, ownProps){
  var profileUserName = state.get('profileUserName')
  return {
    edit : state.get('edit'),
  }

}

function mapDispatchToProps(dispatch, ownProps){
  return {
    updateProfile : (value) => dispatch(updateProfileAction(ownProps.field, value)),
    addToList : (list, item) => dispatch(addToListAction(list, item)),
    deleteFromList : (list, item) => dispatch(deleteFromListAction(list, item))
  }

}




export default class ListFieldView extends React.Component {

	listDisplay(list){
		return list.map((item)=>{
			if(this.props.edit) {
				return(<div>{item}<span className='red invisableButton' onClick={() => this.props.deleteFromList(this.props.field, item)}>X</span><br/></div>)
			} else if (this.props.field === 'games') {
				return(<span>{item} </span>)
			}else{
				return(<span>{item} </span>)
			}
		})
	}

	render(){

		if(this.props.edit){
			return(<span>{this.props.label}: <div>
				<input className="black" type='textbox' id={this.props.field} /><span className='green invisableButton twentyTwo' onClick={() => this.props.addToList(this.props.field, document.getElementById(this.props.field).value)}>+</span>
				{this.listDisplay(this.props.value || [])}
				</div>
				</span>)
		}else{	
			return(
				<span><span className='descriptionTitle'>{this.props.label}</span>:{" "}    
				{this.listDisplay(this.props.value || [])}
				</span>)
			}
		}	
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ListFieldView)