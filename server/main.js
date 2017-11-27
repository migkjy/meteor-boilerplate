import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import './../imports/startup/simpl-shcema-configuration';

// redirecting
Meteor.startup(() => {
  const now = new Date().getTime();
  console.log(now);

  const momentNow = moment(0);
  console.log(momentNow.fromNow());

  WebApp.connectHandlers.use((req, res, next) => {
    //   console.log(req.url, req.url.slice(1)) //모르는 변수는 이렇게 확인해보면 됨
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if (link) {
      // 1. Set HTTP Status code
      // 2. set HTTP Header
      // 3. set HTTP body
      // 4. End HTTP request -> going to the 'Location' Header
      res.statusCode = 302;
      res.setHeader('Location', link.url); // redirecting to the Location
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});
/*
  WebApp.connectHandlers.use((req, res, next) => {
    console.log(req.url, req.method, req.headers, req.query); // n
    // // Set HTTP status code
    // res.statusCode = 404;
    // // Set HTTP headers
    // res.setHeader('my-custom-header', 'Andrew was here');
    // // Set HTTP body
    // res.write('<h1>This is my middleware at work!</h1>');
    // // End HTTP request
    // res.end();

    next();
  });
   */

// request comes in
// run our middleware one at a time
// send them that page
