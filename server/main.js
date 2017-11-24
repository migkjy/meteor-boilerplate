import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import './../imports/startup/simpl-shcema-configuration';

// redirecting
Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    //   console.log(req.url, req.url.slice(1)) //모르는 변수는 이렇게 확인해보면 됨
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
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
