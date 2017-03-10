
import Immutable from 'immutable'



function tavernReducer(previousState, action){
	const name = previousState.get('currentUser')
	switch(action.type){

		//Spell Cases
		case 'SET_SPELL':
			return previousState.set('spellSelected', action.spell)
		case 'SHOW_SPELL':
			return previousState.set('showSpell', !previousState.get('showSpell'))	
		case 'CREATE_SPELL':
			return previousState.setIn(['createSpell', 'show'], action.toggle)
		//Monster Cases	
		case 'SET_MONSTER':
			return previousState.set('monsterSelected', action.monster)
		case 'SHOW_MONSTER':
			return previousState.set('showMonster', !previousState.get('showMonster'))
		//MODAL SETTINGS	
		case 'SET_SHOWMODAL':
			return previousState.setIn(['modal', 'showModal'], action.toggle)
		case 'SET_MODALBODY':
			return previousState.setIn(['modal', 'mBody'], action.mBody)
		case 'SET_MODALHEAD':
			return previousState.setIn(['modal', 'mHead'], action.mHead)
		case 'SET_MODALFOOTER':
			return previousState.setIn(['modal', 'mFooter'], action.mFooter)
		case 'SET_MODALFULL':
			return previousState.set('modal', action.modalFull)	



		case 'TOGGLE_LOGIN':
			return previousState.set('loggedIn', !previousState.get('loggedIn'))
		case 'LOGIN_TRUE':
			return previousState.set('loggedIn', true)
		case 'SET_USER':
			return previousState.set('currentUser', action.user)
		case 'ADD_PROFILE':
			return previousState.setIn(['profiles', action.profile.userName], Immutable.fromJS(action.profile));
		case 'SET_USERNAME':
			return previousState.set('userName', action.userName);
		case 'SET_EMAIL':
			return previousState.set('email', action.email);
		case 'SET_PASSWORD':
			return previousState.set('password', action.password)
		case 'SET_CONFIRM':
			return previousState.set('confirmPassword', action.password)
		case 'SET_SUGGESTION':
			return previousState.set('suggestions', action.suggestions)
		case 'SET_DESCRIPTION':
			return previousState.setIn(['profiles', name, 'description'], action.description)	
		case 'CHANGE_EDITABLE':
			return previousState.set('edit', !previousState.get('edit'));
		case 'UPDATE_PROFILE':
			return previousState.setIn(['profiles', name, action.field], action.value)
		case 'SET_PROFILE_USER_NAME':
			return previousState.set('profileUserName' , action.userName)
		case 'SET_AVAILABILTY':
			return previousState.setIn(['profiles', name, 'availability', action.day, action.time], action.available)
		case 'ADD_LIST_ITEM':
			return previousState.setIn(['profiles', name, action.list], previousState.getIn(['profiles', name, action.list]).push(action.item))
		case 'REMOVE_LIST_ITEM':
			return previousState.setIn(['profiles', name, action.list], previousState.getIn(['profiles', name, action.list]).filter((i) => i !== action.item))
		case 'SET_SEARCH':
			return previousState.setIn(['search', action.element], action.value)
		case 'SET_RESULTS':
			return previousState.set('results', action.results)
		case 'SET_ERROR':
			return previousState.set('errorMessage', action.message)
	}
	return previousState
}

module.exports = tavernReducer