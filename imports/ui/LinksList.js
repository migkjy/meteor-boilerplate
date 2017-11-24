import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Links } from './../api/links';
import LinksListItem from './LinksListItem';


export default class LinkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    };
  }
  componentDidMount() {
    console.log('componentDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find().fetch();
      this.setState({ links });
    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount LinksList');
    this.linksTracker.stop();
  }
  renderLinksListItems = () => (this.state.links.map((link) => {
    const shortUrl = Meteor.absoluteUrl(link._id);
    return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
  }));
  // <p key={link._id}>{link.url}</p>)
  render() {
    return (
      <div>
        <p>Links List</p>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
}
