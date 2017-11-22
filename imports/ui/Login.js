import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Blaze from 'meteor/gadicc:blaze-react-component';

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
      if (err) {
        // this.setState({ error: err.reason });
        this.setState({ error: 'Unable to login, check Id and password' });
      } else {
        this.setState({ error: '' });
      }
    });
  };
  render() {
    return (
      <div>
        <Blaze template="loginButtons" />
        <h1>Short Lnk</h1>

        {this.state.error ? <p>{this.state.error} </p> : undefined}

        <form onSubmit={this._onSubmit} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Login</button>
        </form>

        <Link to="/signup">Have an account?</Link>
      </div>
    );
  }
}

