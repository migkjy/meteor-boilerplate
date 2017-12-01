import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: '',
    };
  }
  onSubmit = (e) => {
    const { url } = this.state;
    // const url = this.state.url; same with above
    // const url = e.target.value; // not working..., setState works
    e.preventDefault();

    // Links.insert({ url, userId: Meteor.userId() });
    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.setState({ url: '', isOpen: false, error: '' });
      } else {
        this.setState({ error: err.reason });
      }
    });
    /*
   if (url) {
      // Links.insert({ url, userId: Meteor.userId() });
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.setState({ url: '', isOpen: false });
        }
      });
    } */
  }
  onChange = (e) => {
    this.setState({
      url: e.target.value.trim(),
    });
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      url: '',
      error: '',
    });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({ isOpen: true })}>+Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add New Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form
            onSubmit={this.onSubmit.bind(this)}
            className="boxed-view__form"
          >
            {/* need bind?!?! */}
            <input
              type="text"
              placeholder="URL"
              ref="url"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button className="button">Add Link</button>
            <button
              className="button button--secondary"
              type="button" // by add type="button", the form does not recognize this button as for submitting
              onClick={this.handleModalClose.bind(this)}
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}
