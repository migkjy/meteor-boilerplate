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
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    // push로는 과거로 못돌아가고 계속 루핑현상이 생길 수 있다. 따라서 과거 기록을 바꾸어주는 replace를 사용해준다.
    // browserHistory.push('/links');
    browserHistory.replace('/links');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    // browserHistory.push('/');
    browserHistory.replace('/');
  }
};

// enter시에 변경
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
    <Route path="*" component={NotFound} />
  </Router>
);

// window.browserHistory = browserHistory;

// 지속적으로 변경
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPages = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPages = autheticatedPages.includes(pathname);

  if (isUnauthenticatedPages && isAuthenticated) {
    // browserHistory.push('/links');
    browserHistory.replace('/links');
  } else if (isAuthenticatedPages && !isAuthenticated) {
    // browserHistory.push('/');
    browserHistory.replace('/');
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('signup'));
});
