import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

class Header extends React.Component {
  renderTime() {
    if (this.props.States.key_values) {
      const time = { ...this.props.States.key_values[0] };
      return <Moment fromNow>{time.lastupdatetime}</Moment>;
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="ui pointing menu">
          <a className="ui gray header item">Home</a>
          <a className="ui gray header item">Map Stats</a>
          <a className="ui gray header item">FAQ</a>
          <div className="right menu">
            <div className="ui green tiny header item">
              <span>Updated {this.renderTime()}</span>
            </div>
          </div>
        </div>
        <div className="ui component">
          <div className="ui one grey large statistics">
            <div className="ui segment statistic">
              <div className="value">COVID-19 Tracker</div>
              <div className="label">Stay home,Stay safe</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    States: state.StateData
  };
};
export default connect(mapStateToProps)(Header);
