import React from 'react';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false,
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success', () => {
      this.setState({ justCopied: true });
      setTimeout(() => this.setState({ justCopied: false }), 1000);
      // setTimeout(this.setState(...)) -> not right, need function
    })
      .on('error', () => alert('Unable to copy. Please manually copy the link'));
  }
  componentWillUnmount() {
    // to be able to destory clipboard, used "this"
    this.clipboard.destroy();
  }
  render() {
    return (
      <div>
        <p>{this.props.shortUrl}</p>
        <p>{this.props.url}</p>
        <p>{this.props.visible.toString()}</p>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
          {/* not this.props.state... */}
        </button>
        <button onClick={() => {
          Meteor.call('links.setVisiblity', this.props._id, !this.props.visible);
        }}
        >
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  shortUrl: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  _id: React.PropTypes.string.isRequired,
};

// const LinksListItem = props => (
//   <div>
//     <p>{props.shortUrl}</p>
//     <p>{props.url}</p>
//   </div>
// );

// export default LinksListItem;

