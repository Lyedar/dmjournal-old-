

//Spell Functions
function setSpellActive(spell){
	return{
		type: 'SET_SPELL',
		spell
	}
}

function setShowSpell(toggle, id){
	return{
		type: 'SHOW_SPELL',
	}
}

function setCreateSpell(toggle){
	return{
		type: 'CREATE_SPELL',
		toggle: toggle
	}
}

//Monster Functions
function setMonsterActive(monster){
	return{
		type: 'SET_MONSTER',
		monster
	}
}

function setShowMonster(toggle, id){
	return{
		type: 'SHOW_MONSTER',
	}
}

//MODAL ACTIONS
function setShowModal(toggle){
	return{
		type: 'SET_SHOWMODAL',
		toggle
	}
}
function setModalBody(mBody){
	return{
		type: 'SET_MODALBODY',
		mBody
	}
}
function setModalHead(mHead){
	return{
		type: 'SET_MODALHEAD',
		mHead
	}
}
function setModalFooter(mFooter){
	return{
		type: 'SET_MODALFOOTER',
		mFooter
	}
}

function setModalFull(modalFull){
	return{
		type: 'SET_MODALFULL',
		modalFull
	}
}

//USER/LOGIN ACTIONS
function setCurrentUserAction(user){
	return{
		type: "SET_USER",
		user
	}
}

function addProfileAction(profile) {
	return{
		type: "ADD_PROFILE",
		profile
	}
}

function toggleLoginAction(){
	return{
		type: "TOGGLE_LOGIN"
	}
}

function loginTrueAction(){
	return{
		type: "LOGIN_TRUE"
	}
}


function setUserNameAction(userName){
	return{
		type: "SET_USERNAME",
		userName
	}
}

function setEmailAction(email){
	return{
		type: 'SET_EMAIL',
		email
	}
}

function setPasswordAction(password){
	return{
		type: 'SET_PASSWORD',
		password
	}
}

function setConfirmPasswordAction(password){
	return{
		type: 'SET_CONFIRM',
		password
	}
}

function setSuggestionsAction(suggestions){
	return {
		type: 'SET_SUGGESTION',
		suggestions
	}
}

//PROFILE ACTIONS
function updateProfileAction(field, value){
	return {
		type: 'UPDATE_PROFILE',
		field,
		value
	}

}

function setProfileUserNameAction(userName){
	return{
		type: 'SET_PROFILE_USER_NAME',
		userName
	}

}

function changeAvailabiltyAction(day, time, available){
	return{
		type: 'SET_AVAILABILTY',
		day,
		time,
		available
	}
}

function changeEditAction(){
	return {
		type: 'CHANGE_EDITABLE'
	}
}

function setDescriptionAction(description){
	return{
		type: 'SET_DESCRIPTION',
		description
	}
}

function addToListAction(list, item){
	return {
		type: 'ADD_LIST_ITEM',
		list,
		item
	}
}

function deleteFromListAction(list, item){
	return {
		type: 'REMOVE_LIST_ITEM',
		list,
		item
	}
}


//SEARCH ACTIONS
function setSearchAction(element, value) {
	return {
		type: 'SET_SEARCH',
		element,
		value
	}
}

function setResultsAction(results){
	return{
		type: 'SET_RESULTS',
		results
	}
}

//ERROR MESSAGE ACTIONS

function setErrorMessageAction(message){
	return {
		type: 'SET_ERROR',
		message
		}
}

module.exports = {
	setSpellActive,
	setShowSpell,
	setCreateSpell,
	setMonsterActive,
	setShowMonster,

	setShowModal,
	setModalBody,
	setModalHead,
	setModalFooter,
	setModalFull,

	toggleLoginAction,
	loginTrueAction,
	addProfileAction,
	setCurrentUserAction,
	setUserNameAction,
	setEmailAction,
	setPasswordAction,
	setConfirmPasswordAction,
	setSuggestionsAction,
	setDescriptionAction,
	updateProfileAction,
	setProfileUserNameAction,
	changeAvailabiltyAction,
	changeEditAction,
	addToListAction,
	deleteFromListAction,
	setSearchAction,
	setResultsAction,
	setErrorMessageAction
}
