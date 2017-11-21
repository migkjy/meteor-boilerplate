import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  _onSubmit = (e) => { // arrow function does not need bind() ?
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Accounts.createUser({ email, password }, (err) => {
      console.log('Signup callback', err);
    });
  };
  render() {
    return (
      <div>
        <h1>Join Short Lnk</h1>

        {this.state.error ? <p>{this.state.error} </p> : undefined}

        <form onSubmit={this._onSubmit}>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Create Account</button>
        </form>

        <Link to="/">Alreay have an Account?</Link>
      </div>
    );
  }
}

