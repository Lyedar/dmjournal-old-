import { createStore } from 'redux'
import tavernReducer from './reducer'
import Immutable from 'immutable'


var initialState = Immutable.fromJS({

	spellSelected : {},
	showSpell : false,

	monsterSelected : {},
	showMonster : false,

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