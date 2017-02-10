import React from 'react';
import {changeEditAction} from '../redux/actions'
import {connect} from 'react-redux'


function mapStateToProps(state){
	return {
		edit : state.get('edit')
	}

}

function mapDispatchToProps(dispatch){
	return {
		changeEdit : () => dispatch(changeEditAction())
	}

}

module.exports= connect(mapStateToProps, mapDispatchToProps)