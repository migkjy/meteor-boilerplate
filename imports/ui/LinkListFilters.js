import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinkListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true,
    };
  }
  componentDidMount() {
    this.showTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible'),
      });
    });
  }
  componentWillUnmount() {
    this.showTracker.stop();
  }
  render() {
    return (
      <div>
        <lebel className="checkbox">
          <input
            type="checkbox"
            className="checkbox__box"
            onChange={(e) => {
              Session.set('showVisible', !e.target.checked);
            }}
          />
            show hidden links
        </lebel>
      </div>
    );
  }
}
