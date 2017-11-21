import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';
import NotFound from './../imports/ui/NotFound';
import Login from './../imports/ui/Login';

const unauthenticatedPages = ['/', '/signup'];
const autheticatedPages = ['/links'];
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/links" component={Link} />
    <Route path="*" component={NotFound} />
  </Router>
);
window.browserHistory = browserHistory;
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPages = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPages = autheticatedPages.includes(pathname);

  if (isUnauthenticatedPages && isAuthenticated) {
    browserHistory.push('/links');
  } else if (isAuthenticatedPages && !isAuthenticated) {
    browserHistory.push('/');
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('signup'));
});
