import { createStore } from 'redux'
import tavernReducer from './reducer'
import Immutable from 'immutable'


var initialState = Immutable.fromJS({
	user:{
		username: '',
		playerType: '',
		email: '',
		authenticated: false
	},
	spellSelected : {},
	createSpell: {
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
	profileUserName: false,
	edit: false,
	results: {},
	suggestions: false
})

module.exports =  createStore(tavernReducer, initialState, window.devToolsExtension && window.devToolsExtension())
