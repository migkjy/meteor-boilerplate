import React from 'react';
import { Link } from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  // increment() {
  //   this.setState({
  //     count: this.state.count + 1,
  //   });
  // }
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
    const increment = () => {
      this.setState({
        count: this.state.count + 1,
      });
    };
    const decrement = () => {
      this.setState({
        count: this.state.count - 1,
      });
    };
    return (
      <div>
        <h1>Join Shor Lnk</h1>

        <p>{this.state.count}</p>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <Link to="/">Alreay have an Account?</Link>
      </div>
    );
  }
}

