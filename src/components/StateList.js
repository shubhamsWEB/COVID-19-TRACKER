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
                      <table className="ui selectable tiny celled unstackable table">
                        <thead>
                          <tr>
                            <th>DISTRICT</th>
                            <th>CONFIRMED</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Bhailai</td>
                            <td>1</td>
                          </tr>
                          <tr>
                            <td>Bhailai</td>
                            <td>1</td>
                          </tr>
                          <tr>
                            <td>Korba</td>
                            <td>2</td>
                          </tr>
                          <tr>
                            <td>Raigarh</td>
                            <td>1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* <div className="ui segment">
                    <a style={{ color: "gray" }}>
                      <strong>{State.state}</strong>
                    </a>
                  </div> */}
                </td>
                <td>
                  <div className="ui compact menu">
                    <a style={{ color: "grey" }} className="item">
                      <strong>{State.confirmed}</strong>
                      {this.renderComfirmed(State)}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="ui compact menu">
                    <a style={{ color: "grey" }} className="item">
                      <strong>{State.active}</strong>
                      {this.renderActive(State)}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="ui compact menu">
                    <a style={{ color: "grey" }} className="item">
                      <strong>{State.recovered}</strong>
                      {this.renderRecovered(State)}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="ui compact menu">
                    <a style={{ color: "grey" }} className="item">
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
        if (T.state == "Total") {
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
    console.log(this.props.DistrictWise);

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
              <th>STATE</th>
              <th>CONFIRMED</th>
              <th>ACTIVE</th>
              <th>RECOVERED</th>
              <th>DECEASED</th>
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
    DistrictWise: Object.keys(state.DistrictData),
    States: state.StateData
  };
};
export default connect(mapStateToProps, { getStateWise, getDistrictWise })(
  StateList
);
