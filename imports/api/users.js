import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
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
