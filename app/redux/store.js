import { createStore } from 'redux'
import tavernReducer from './reducer'
import Immutable from 'immutable'


var initialState = Immutable.fromJS({

	spellSelected : {},
	createSpell: {
			show: false,
			spell: {}	
	}, 

	monsterSelected : {},
	showMonster : false,

	modal:{
		showModal:false,
		mBody: '',
		mHead:'',
		mFooter:''
	},

	loggedIn: false,
	errorMessage: false,
	profiles: {},
	currentUser : false,
	profileUserName: false,
	edit: false,
	search: {
		dm: true,
		player: true,
		list: 'game'
	},
	results: {},
	suggestions: false,
	userName: '',
	email: '',
	password: '',
	confirmPassword: ''
})

module.exports =  createStore(tavernReducer, initialState, window.devToolsExtension && window.devToolsExtension())