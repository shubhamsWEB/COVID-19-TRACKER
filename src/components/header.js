import React from "react";
import { connect } from "react-redux";

class Header extends React.Component {
  renderTime() {
    if(Object.values(this.props.States).length >0) {
      return this.props.States.key_values.map(time => {
        return <div key="1">{time.lastupdatedtime}</div>;
      });
    }
  }
  render() {

    return (
      <React.Fragment>
        <div className="ui pointing menu">
          <a className="item"><h4 className="ui gray header">Home</h4></a>
          <a className="item"><h4 className="ui gray header">Map Stats</h4></a>
          <a className="item"><h4 className="ui gray header">SYMPTOMS</h4></a>
          <a className="item"><h4 className="ui gray header">FAQ</h4></a>
          <div className="right menu">
            <div className="ui green tiny header item">
              <span>Last Updated {this.renderTime()}</span>
            </div>
          </div>
        </div>
        <div className="ui component">
          <div className="ui one grey statistics">
            <div className="ui statistic">
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
