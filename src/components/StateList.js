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
        <span className="text-danger">
          <small>
            <strong>+{State.delta.confirmed}</strong>
          </small>
        </span>
      );
    }
  };

  renderActive = State => {
    if (State.delta.active !== 0) {
      return (
        <span className="text-primary">
          <small>
            <strong>+{State.delta.active}</strong>
          </small>
        </span>
      );
    }
  };

  renderRecovered = State => {
    if (State.delta.recovered !== 0) {
      return (
        <span className="text-success">
          <small>
            <strong>+{State.delta.recovered}</strong>
          </small>
        </span>
      );
    }
  };

  renderDeaths = State => {
    if (State.delta.deaths !== 0) {
      return (
        <span className="text-secondary">
          <small>
            <strong>{State.delta.deaths}</strong>
          </small>
        </span>
      );
    }
  };

  renderDistrict = State => {
    if (this.props.DistrictWise[State]) {
      return Object.entries(this.props.DistrictWise[State].districtData).map(
        District => {
          return (
            <React.Fragment key={District[0]}>
              <tr className="shadow-sm">
                <td className="color-gray">
                  <p className="h6">{District[0]}</p>
                </td>
                <td className="color-gray h6">
                  {District[1].confirmed}
                </td>
              </tr>
            </React.Fragment>
          );
        }
      );
    }
  };
  click = (iconid) => {
      var el = document.querySelector(`#${iconid}`);
      if(el.classList.contains('right')) {
      el.classList.remove('right');
      el.classList.add('down');
      } else {
        el.classList.remove('down');
        el.classList.add('right');  
      }
  }
  renderState = () => {
    if (this.props.States.statewise) {
      return this.props.States.statewise.map((State, key) => {
        if (State.state !== "Total" && State.confirmed !== "0") {
          var tar = `#s${key}`;
          var id = `s${key}`;
          var iconid = `i${key}`
          return (
            <React.Fragment key={key}>
              <tr className="shadow-sm">
                <td onClick={() => this.click(iconid)}
                  style={{ cursor: "pointer" }}
                  className="color-gray"
                  data-toggle="collapse"
                  data-target={tar}
                >
                  <i class="arrow circular right small icon" id={iconid}></i>
                  <span className="h6">{State.state}</span>
                </td>
                <td className="color-gray">
                  <span className="h6">{State.confirmed}</span>
                  {this.renderComfirmed(State)}
                </td>
                <td className="color-gray">
                <span className="h6">{State.active}</span>
                  {this.renderActive(State)}
                </td>
                <td className="color-gray">
                <span className="h6">{State.recovered}</span>
                  {this.renderRecovered(State)}
                </td>
                <td className="color-gray">
                <span className="h6">{State.deaths}</span>
                  {this.renderDeaths(State)}
                </td>
              </tr>

              <td colSpan="5">
                <div class="collapse" id={id}>
                  <div class="card card-body">
                    <table class="table table-sm table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th>DISTRICTS</th>
                          <th>CONFIRMED</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderDistrict(State.state)}</tbody>
                    </table>
                  </div>
                </div>
              </td>
            </React.Fragment>
          );
        }
      });
    }
  };
  renderDelta(Type) {
    if (Object.values(this.props.States).length > 0) {
      return this.props.States.key_values.map(T => {
        if (Type === "D") {
          return (
            <React.Fragment key={Type}>
              <p className="font-weight-bold">[+{T.deceaseddelta}]</p>
            </React.Fragment>
          );
        }
        if (Type === "C") {
          return (
            <React.Fragment key={Type}>
              <p className="font-weight-bold">[+{T.confirmeddelta}]</p>
            </React.Fragment>
          );
        }
        if (Type === "R") {
          return (
            <React.Fragment key={Type}>
              <p className="font-weight-bold">[+{T.recovereddelta}]</p>
            </React.Fragment>
          );
        }
      });
    }
  }
  renderTotal() {
    if (this.props.States.statewise) {
      return this.props.States.statewise.map(T => {
        if (T.state === "Total") {
          return (
            <div className="row" key={T.state}>
              <div className="col text-center shadow-sm border-bottom border-danger">
                <h6 style={{ background: "#FF6B89", borderRadius: "5px" }}>
                  CONFIRMED
                </h6>
                <p className="text-danger">{this.renderDelta("C")}</p>
                <h3 className="text-danger">{T.confirmed}</h3>
                <i class="medkit red big icon mb-2"></i>
              </div>
              <div className="col text-center shadow-sm border-bottom border-primary">
                <h6 style={{ background: "#8EC5FF", borderRadius: "5px" }}>
                  ACTVIE
                </h6>
                <p className="text-primary font-weight-bolder">
                  {this.renderDelta("C")}
                </p>
                <h3 className="text-primary">{T.active}</h3>
                <i class="hospital blue outline big icon mb-2"></i>
              </div>
              <div className="col text-center shadow-sm border-bottom border-success">
                <h6 style={{ background: "#96D4A3", borderRadius: "5px" }}>
                  RCOVERED
                </h6>
                <p className="text-success font-weight-bolder">
                  {this.renderDelta("R")}
                </p>
                <h3 className="text-success">{T.recovered}</h3>
                <i class="heartbeat green big icon mb-2"></i>
              </div>
              <div className="col text-center shadow-sm border-bottom border-secondary">
                <h6 style={{ background: "#B1B6BA", borderRadius: "5px" }}>
                  DECEASED
                </h6>
                <p className="text-secondary font-weight-bolder">
                  {this.renderDelta("D")}
                </p>
                <h3 className="text-secondary">{T.deaths}</h3>
                <i class="heart grey outline big icon mb-2"></i>
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
      <React.Fragment>
        {this.renderTotal()}
        <table class="table table-hover table-sm table-light table-bordered mt-2">
          <thead className="thead-light">
            <tr className="text-center">
              <th className="h6">STATS</th>
              <th className="text-danger h6">
                CONF
              </th>
              <th className="text-primary h6">
                ACTIVE
              </th>
              <th className="text-success h6">
                RECVRD
              </th>
              <th className="text-secondary h6">
                DECD
              </th>
            </tr>
          </thead>
          <tbody>{this.renderState()}</tbody>
        </table>
      </React.Fragment>
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
