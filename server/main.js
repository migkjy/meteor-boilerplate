import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  Accounts.validateNewUser((user) => {
    // console.log('this is the user', user);
    // I20171121-04:02:01.486(-8)? this is the user { createdAt: 2017-11-21T12:02:01.484Z,
    //   I20171121-04:02:01.487(-8)?   _id: '8wbTePtg9qSmTkD3A',
    //   I20171121-04:02:01.487(-8)?   services
    //   I20171121-04:02:01.487(-8)?    { password
    //   I20171121-04:02:01.487(-8)?       { bcrypt: '$2a$10$3H3GXpg2aqXDTeexgEx5cuTVfbv3yy.A8wpFSScMmbUnknKnCRmmO' } },
    //   I20171121-04:02:01.487(-8)?   emails: [ { address: 'migkjy5@naver.com', verified: false } ] } -> emails[0].address
    const email = user.emails[0].address;

    try {
      new SimpleSchema({
        email: {
          type: String,
          regEx: SimpleSchema.RegEx.Email,
        },
      }).validate({ email }); // validate에서 이상 생기면 서버에서 에러 발생. 안되면 true로 id created
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    return true;
  });
});


//   const employeeSchema = new SimpleSchema({
//     name: {
//       type: String,
//       min: 1,
//       max: 200,
//     },
//     houlyWage: {
//       type: Number,
//       min: 0,
//     },
//     email: {
//       type: String,
//       regEx: SimpleSchema.RegEx.Email,
//     },
//   });
//   employeeSchema.validate({
//     name: 'june',
//     houlyWage: 34,
//     email: 'mig@nvaer.com',
//   });
// });


// Meteor.startup(() => {
//   // code to run on server at startup
//   const petSchema = new SimpleSchema({
//     name: {
//       type: String,
//       min: 1,
//       max: 200,
//       optional: true,
//     },
//     age: {
//       type: Number,
//       min: 0,
//     },
//     contactNumber: {
//       type: String,
//       optional: true,
//       regEx: SimpleSchema.RegEx.Phone,
//     },
//   });


//   petSchema.validate({
//     age: 21,
//     contactNumber: '1234',
//   });
// });
