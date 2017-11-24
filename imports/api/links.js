import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  // param 'links' is just an string, argument
  //   'link'라는 param이 들어오면 뒤의 함수를 실행시킨다.
  // Meteor.publish method is only available on the server

  Meteor.publish('links', function () {
    // Meteor.userID is not working in Meteor.publish
    // so used return to get only data, not Meteor.userId
    // 그런데 아래 this는 어쨌거나 Meteor이구만. 복잡하네
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  'links.insert': function (url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      new SimpleSchema({
        url: {
          type: String,
          label: 'Your link', // 입력정보를 Your link로 바꾸어서 정보를 표시
          regEx: SimpleSchema.RegEx.Url,
        },
      }).validate({ url });
      // }).validate(url); : need {} !!  , 자료형을 검사하는 것??
    } catch (e) {
      // throw new Meteor.Error(400, e.message);
      throw new Meteor.Error(400, e.message);
    }

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
    });
  },
});

