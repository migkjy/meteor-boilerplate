import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  // param 'links' is just an string, argument
  //   'link'라는 param이 들어오면 뒤의 함수를 실행시킨다.
  // Meteor.publish method is only available on the server

  Meteor.publish('links', () => Links.find({}));
}
