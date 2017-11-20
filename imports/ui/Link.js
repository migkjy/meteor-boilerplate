import React from 'react';
import { browserHistory } from 'react-router';

export default class Link extends React.Component {
  onLogout() {
    this.browserHistory.push('/');
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
