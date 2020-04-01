import React from "react";
import { connect } from "react-redux";
import { getStateWise, getDistrictWise } from "../actions";
import "../css/StateList.css";
class StateList extends React.Component {
  componentDidMount() {
    this.props.getStateWise();
    this.props.getDistrictWise();
  }

  renderComfirmed = State => {
    if (State.delta.confirmed !== 0) {
      return (
        <div className="floating ui red label">+{State.delta.confirmed}</div>
      );
    }
  };

  renderActive = State => {
    if (State.delta.active !== 0) {
      return (
        <div className="floating ui blue label">+{State.delta.active}</div>
      );
    }
  };

  renderRecovered = State => {
    if (State.delta.recovered !== 0) {
      return (
        <div className="floating ui green label">+{State.delta.recovered}</div>
      );
    }
  };

  renderDeaths = State => {
    if (State.delta.deaths !== 0) {
      return (
        <div className="floating ui gray label">+{State.delta.deaths}</div>
      );
    }
  };

  renderDistrict = State => {
    if (this.props.DistrictWise[State]) {
      return Object.entries(this.props.DistrictWise[State].districtData).map(
        District => {
          return (
            <React.Fragment>
              <tr>
                <td className="color-gray"><strong>{District[0]}</strong></td>
                <td className="color-gray"><strong>{District[1].confirmed}</strong></td>
              </tr>
            </React.Fragment>
          );
        }
      );
    }
  };
  renderState = () => {
    if (this.props.States.statewise) {
      return this.props.States.statewise.map(State => {
        if (State.state !== "Total" && State.confirmed !== "0") {
          return (
            <React.Fragment>
              <tr>
                <td>
                  <div className="ui styled fluid accordion">
                    <div className="title">
                      <i className="dropdown icon"></i>
                      <a style={{ color: "gray" }}>
                        <strong>{State.state}</strong>
                      </a>
                    </div>
                    <div className="content">
                      <table className="ui selectable very compact celled unstackable table">
                        <thead>
                          <tr>
                            <th>DISTRICT</th>
                            <th>CNF</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderDistrict(State.state)}</tbody>
                      </table>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="ui compact menu">
                    <a className="item color-gray">
                      <strong>{State.confirmed}</strong>
                      {this.renderComfirmed(State)}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="ui compact menu">
                    <a className="item color-gray">
                      <strong>{State.active}</strong>
                      {this.renderActive(State)}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="ui compact menu">
                    <a className="item color-gray">
                      <strong>{State.recovered}</strong>
                      {this.renderRecovered(State)}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="ui compact menu">
                    <a className="item color-gray">
                      <strong>{State.deaths}</strong>
                      {this.renderDeaths(State)}
                    </a>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          );
        }
      });
    }
  };
  renderTotal() {
    if (this.props.States.statewise) {
      return this.props.States.statewise.map(T => {
        if (T.state === "Total") {
          return (
            <div className="ui four statistics">
              <div className="ui red segment statistic">
                <a className="ui red ribbon mini label">+{T.delta.confirmed}</a>
                <div className="value">{T.confirmed}</div>
                <div className="label">COMFIRMED</div>
              </div>
              <div className="ui blue segment statistic">
                <a className="ui blue ribbon mini label">+{T.delta.active}</a>
                <div className="value">{T.active}</div>
                <div className="label">ACTIVE</div>
              </div>
              <div className="ui green segment statistic">
                <a className="ui green ribbon mini label">
                  +{T.delta.recovered}
                </a>
                <div className="value">{T.recovered}</div>
                <div className="label">RECOVERED</div>
              </div>
              <div className="ui grey segment statistic">
                <a className="ui grey ribbon mini label">+{T.delta.deaths}</a>
                <div className="value">{T.deaths}</div>
                <div className="label">DEATH</div>
              </div>
            </div>
          );
        }
      });
    }
  }
  render() {
    if (!this.props.States || !this.props.DistrictWise) {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    return (
      <>
        {this.renderTotal()}
        <table className="ui selectable celled blue unstackable table">
          <thead>
            <tr>
              <th>
                <h4>STATES</h4>
              </th>
              <th>
                <h4 className="color-red">CNFMD</h4>
              </th>
              <th>
                <h4 className="color-blue">ACTIVE</h4>
              </th>
              <th>
                <h4 className="color-green">RCVRD</h4>
              </th>
              <th>
                <h4 className="color-gray">DECEASED</h4>
              </th>
            </tr>
          </thead>
          <tbody>{this.renderState()}</tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    DistrictWise: state.DistrictData,
    States: state.StateData
  };
};
export default connect(mapStateToProps, { getStateWise, getDistrictWise })(
  StateList
);
