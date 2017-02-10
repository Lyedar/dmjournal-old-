import React from 'react';
import { Route, IndexRoute } from 'react-router';

//All compenets
import Search from 'containers/Search';
import App from 'containers/App';
import Profile from 'containers/Profile';
import Home from 'containers/Home';
import SignUp from 'containers/SignUp';
import LogOut from 'containers/LogOut';
import PageNotFound from 'containers/PageNotFound';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path = "profile/:slug" component={Profile} />
      <Route path="logout" component = {LogOut} />
      <Route path = "*" component = {PageNotFound} />
    </Route>
  );
};
