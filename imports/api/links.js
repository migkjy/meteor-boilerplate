import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  // param 'links' is just an string, argument
  //   'link'라는 param이 들어오면 뒤의 함수를 실행시킨다.
  // Meteor.publish method is only available on the server

  Meteor.publish('links', function () {
    // Meteor.userID is not working in Meteor.pulish
    // so used return to get only data, not Meteor.userId
    // 그런데 아래 this는 어쨌거나 Meteor이구만. 복잡하네
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  greetUser(name) {
    console.log('greetUser is running');

    if (!name) {
      throw new Meteor.Error('invalid-arguments', 'Name is required');
    }
    return `Hello ${name}!`;
  },
  addNumber(a, b) {
    console.log('Meteor.method addNumber is running');

    // if (typeof a !== Number || typeof b !== Number) { wrong type name
    // Typeof comparisons should be to string literals. (valid-typeof)
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Meteor.Error('invalid-arguments', 'only numbers required');
    }

    return a + b;
  },
});

