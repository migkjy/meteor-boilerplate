import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from '../imports/routes/routes';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  Meteor.call('addNumber', 3, 5, (err, res) => {
    console.log('client addNumber is running', err, res);
  });
  ReactDOM.render(routes, document.getElementById('signup'));
});
