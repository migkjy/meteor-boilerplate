import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Links } from './../api/links';
import LinkList from './LinksList';

export default class Link extends React.Component {
  onLogout() {
    this.Accounts.logout();
  }
  onSubmit = (e) => {
    const url = this.refs.url.value.trim();
    // const url = e.target.value; // not working...
    console.log(url);

    e.preventDefault();

    if (url) {
      Links.insert({ url, userId: Meteor.userId() });
      this.refs.url.value = '';
    }
  }
  render() {
    return (
      <div>
        <h1>Link</h1>
        <button onClick={this.onLogout}>logout</button>
        <LinkList />
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL" />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
}
