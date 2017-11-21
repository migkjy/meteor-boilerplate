import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  _onSubmit = (e) => {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({ email }, password, (err) => {
      console.log('Login callback', err);
    });
  };
  render() {
    return (
      <div>
        <h1>Short Lnk</h1>

        {this.state.error ? <p>{this.state.error} </p> : undefined}

        <form onSubmit={this._onSubmit}>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Login</button>
        </form>

        <Link to="/signup">Have an account?</Link>
      </div>
    );
  }
}

