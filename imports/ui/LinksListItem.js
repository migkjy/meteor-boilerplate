import React from 'react';
import moment from 'moment';
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
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? ' visit' : ' visits';
    let visitedMessage = null;

    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
    }
    return <p>{this.props.visitedCount}{visitMessage} {visitedMessage}</p>;
  }
  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {/* <p>{this.props.visible.
        toString()}</p> */}
        {this.renderStats()}
        <a
          href={this.props.shortUrl}
          target="_blank"
          className="button button--link button--pill "
        >
          Visit
        </a>
        <button
          ref="copy"
          data-clipboard-text={this.props.shortUrl}
          className="button button--pill"
        >
          {this.state.justCopied ? 'Copied' : 'Copy'}
          {/* not this.props.state... */}
        </button>
        <button
          className="button button--pill"
          onClick={() => {
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
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisitedAt: React.PropTypes.number, // if null is contained. don't use isRequired
};

// const LinksListItem = props => (
//   <div>
//     <p>{props.shortUrl}</p>
//     <p>{props.url}</p>
//   </div>
// );

// export default LinksListItem;

