import React from 'react';
import Clipboard from 'clipboard';


export default class LinksListItem extends React.Component {
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success', () => alert('It worked'))
      .on('error', () => alert('Unable to copy. Please manually copy the link'));
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  render() {
    return (
      <div>
        <p>{this.props.shortUrl}</p>
        <p>{this.props.url}</p>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>Copy</button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  shortUrl: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  _id: React.PropTypes.string.isRequired,
};

// const LinksListItem = props => (
//   <div>
//     <p>{props.shortUrl}</p>
//     <p>{props.url}</p>
//   </div>
// );

// export default LinksListItem;

