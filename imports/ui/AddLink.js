import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'June was here',
    };
  }
  onSubmit = (e) => {
    const { url } = this.state;
    // const url = this.state.url; same with above
    // const url = e.target.value; // not working..., setState works
    e.preventDefault();

    if (url) {
      // Links.insert({ url, userId: Meteor.userId() });
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.setState({ url: '' });
        }
      });
    }
  }
  onChange = (e) => {
    this.setState({
      url: e.target.value.trim(),
    });
  }
  render() {
    return (
      <div>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            placeholder="URL"
            value={this.state.url}
            onChange={this.onChange.bind(this)}
          />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
}
