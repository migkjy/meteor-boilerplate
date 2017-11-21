import React from 'react';
import { Accounts } from 'meteor/accounts-base';


export default class Link extends React.Component {
  onLogout() {
    this.Accounts.logout();
  }
  render() {
    return (
      <div>
        <h1>Link</h1>
        <button onClick={this.onLogout}>logout</button>
      </div>
    );
  }
}
