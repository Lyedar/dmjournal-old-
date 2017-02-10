import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import {setSearchAction, setResultsAction, addProfileAction, setErrorMessageAction, setProfileUserNameAction} from '../redux/actions';
import {connect} from 'react-redux';
import requestApi from '../utilities/requests';
import _ from 'lodash';

function mapStateToProps(state, ownProps){
	console.log('stttate', state.toJS())
  	return {
	    edit : state.get('edit'),
	    user: state.get('currentUser'),
	    search: state.get('search').set('currentUser',state.get('currentUser')),
	    results: state.get('results'),
	    loggedIn: state.get('loggedIn')
	}
}

function mapDispatchToProps(dispatch, ownProps){
  return {
  	setProfileUserName: (name) => dispatch(setProfileUserNameAction(name)),
    setSearch : (element, value) => dispatch(setSearchAction(element, value)),
    setResults: results => dispatch(setResultsAction(results)),
    setErrorMessage: message => dispatch(setErrorMessageAction(message)),
    addProfile: profile => dispatch(addProfileAction(profile))
  }
}

export default class SearchView extends React.Component {

	componentWillMount(){
		this.props.setErrorMessage('')
	}

	searchTag() {
		var self = this
		console.log('Searching',self.props.search)
		requestApi('/api/v1/search', 'PUT')(self.props.search) 
		.then((results) => {
				self.props.setResults(results)
				results.map((profile)=>this.props.addProfile(profile))
		})
	}

	searchResults() {
		if(this.props.results) {
			return this.props.results.map((profile) => {
				return (<div>
							<h4><Link to={'/profile/'+profile.userName}><span onClick={()=> this.props.setProfileUserName(profile.userName)}>{profile.userName}</span></Link></h4>
							{profile.location}<br />
							{profile.games}<br />
							<Calendar userName={profile.userName} />
						</div>)
			})
		}
	}

	render () {
		var {dm, player, list} = this.props.search.toJS()
		if(this.props.loggedIn) {
			return (
				<div className='container-fluid marginTop centerText profileCD'>
					<h1 className = 'profileName'>Search Page</h1>
		            <select id='valueSelector' onChange={(e) => this.props.setSearch('list', e.target.value)}>
		            	<option selected={list==='times'} value='times'>Times</option>
		            	<option selected={list==='location'} value='location'>Location</option>
		            	<option selected={list==='game'} value='game'>Game</option>
		            </select>
		            <input type='checkbox' checked={dm} id = 'dm' onChange={(e) => this.props.setSearch('dm', !dm)}  />Dungeon Master
		            <input type='checkbox' checked={player} id = 'player' onChange={(e) => this.props.setSearch('player', !player)}  />Player		
					<button onClick={::this.searchTag}>Search</button>
				<div>
					{this.searchResults()}
				</div>
				</div>
			)
  		}else {
			return (<div className="addToFriends centerText">
		        <br/>
		        <br/>
		        <h1>PLEASE LOGIN</h1>
		        <h3><Link to ="/">return home</Link></h3>
		        </div>)
		}
	}
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(SearchView)