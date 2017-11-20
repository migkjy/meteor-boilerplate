import React from 'react';
import { Link } from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  increment() {
    this.setState({
      count: this.state.count + 1,
    });
  }
  decrement() {
    this.setState({
      count: this.state.count - 1,
    });
  }
  // JSX props should not use .bind() 해결책 1
  // _onclick = () => {
  //   this.increment();
  // }
  render() {
    // JSX props should not use .bind() 해결책 2
    const clickIncrement = () => {
      this.increment();
    };
    const clickDecrement = () => {
      this.decrement();
    };
    return (
      <div>
        <h1>Signup Component here</h1>

        <p>{this.state.count}</p>
        <button onClick={clickIncrement}>+1</button>
        <button onClick={clickDecrement}>-1</button>
        <Link to="/">Alreay have an Account?</Link>
      </div>
    );
  }
}

