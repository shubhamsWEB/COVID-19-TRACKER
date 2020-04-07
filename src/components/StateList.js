import React from "react";
import { connect } from "react-redux";
import { getStateWise, getDistrictWise } from "../actions";
import "../css/StateList.css";
import Map from "./Map";
class StateList extends React.Component {
  constructor(props) {
    super(props);
    this.DailyData = [];
  }
  componentDidMount() {
    this.props.getStateWise();
    this.props.getDistrictWise();
  }

  renderComfirmed = (State) => {
    if (State.deltaconfirmed !== "0") {
      return (
        <span className="text-danger">
          <small>
            <strong>+{State.deltaconfirmed}</strong>
          </small>
        </span>
      );
    }
  };

  renderActive = (State) => {
    if (State.deltaconfirmed !== "0") {
      return (
        <span className="text-danger">
          <small>
            <strong>+{State.deltaconfirmed}</strong>
          </small>
        </span>
      );
    }
  };

  renderRecovered = (State) => {
    if (State.deltarecovered !== "0") {
      return (
        <span className="text-success">
          <small>
            <strong>+{State.deltarecovered}</strong>
          </small>
        </span>
      );
    }
  };

  renderDeaths = (State) => {
    if (State.deltadeaths !== "0") {
      return (
        <span className="text-dark">
          <small>
            <strong>+{State.deltadeaths}</strong>
          </small>
        </span>
      );
    }
  };
  renderDistrictDelta = (District) => {
    if (District[1].delta.confirmed !== 0) {
      return (
        <span className="text-danger">
          <small>
            <strong> +{District[1].delta.confirmed}</strong>
          </small>
        </span>
      );
    }
  };
  renderDistrict = (State) => {
    if (this.props.DistrictWise[State]) {
      return Object.entries(this.props.DistrictWise[State].districtData).map(
        (District) => {
          return (
            <React.Fragment key={District[0]}>
              <tr className="shadow-sm">
                <td className="color-gray">
                  <p className="h6">{District[0]}</p>
                </td>
                <td className="color-gray h6">
                  {District[1].confirmed}
                  {this.renderDistrictDelta(District)}
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
    if (el.classList.contains("right")) {
      el.classList.remove("right");
      el.classList.add("down");
    } else {
      el.classList.remove("down");
      el.classList.add("right");
    }
  };
  renderState = () => {
    if (this.props.States.statewise) {
      return this.props.States.statewise.map((State, key) => {
        if (State.state !== "Total" && State.confirmed !== "0") {
          var tar = `#s${key}`;
          var id = `s${key}`;
          var iconid = `i${key}`;
          return (
            <React.Fragment key={key}>
              <tr className="shadow-sm">
                <td
                  onClick={() => this.click(iconid)}
                  style={{ cursor: "pointer" }}
                  className="color-gray"
                  data-toggle="collapse"
                  data-target={tar}
                >
                  <i
                    className="arrow circular right small icon"
                    id={iconid}
                  ></i>
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
                <div className="collapse" id={id}>
                  <div className="card card-body">
                    <table className="table table-sm table-bordered">
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
  // renderDelta(Type) {
  //   if (Object.values(this.props.States).length > 0) {
  //     return this.props.States.key_values.map((T) => {
  //       if (Type === "D") {
  //         return (
  //           <React.Fragment key={Type}>
  //             <span className="font-weight-bold">[+{T.deceaseddelta}]</span>
  //           </React.Fragment>
  //         );
  //       }
  //       if (Type === "C") {
  //         return (
  //           <React.Fragment key={Type}>
  //             <span className="font-weight-bold">[+{T.confirmeddelta}]</span>
  //           </React.Fragment>
  //         );
  //       }
  //       if (Type === "R") {
  //         return (
  //           <React.Fragment key={Type}>
  //             <span className="font-weight-bold">[+{T.recovereddelta}]</span>
  //           </React.Fragment>
  //         );
  //       }
  //     });
  //   }
  // }
  renderTotal() {
    if (this.props.States.statewise) {
      return this.props.States.statewise.map((T) => {
        if (T.state === "Total") {
          return (
            <div className="row" key={T.state}>
              <div className="col text-center border-bottom border-danger">
                <p
                  className="h6"
                  style={{ background: "#FF6B89", borderRadius: "5px" }}
                >
                  CONFIRMED
                </p>
                <p className="text-danger">
                  <span className="font-weight-bold">
                    [+{T.deltaconfirmed}]
                  </span>
                </p>
                <h3 style={{ fontFamily: "Ubuntu" }} className="text-danger">
                  {T.confirmed}
                </h3>
                <i className="medkit red big icon mb-2"></i>
              </div>
              <div className="col text-center border-bottom border-primary">
                <p
                  className="h6"
                  style={{ background: "#8EC5FF", borderRadius: "5px" }}
                >
                  ACTIVE
                </p>
                <p className="text-danger font-weight-bolder">
                  <span className="font-weight-bold">
                    [+{T.deltaconfirmed}]
                  </span>
                </p>
                <h3 style={{ fontFamily: "Ubuntu" }} className="text-primary">
                  {T.active}
                </h3>
                <i className="hospital blue outline big icon mb-2"></i>
              </div>
              <div className="col text-center border-bottom border-success">
                <p
                  className="h6"
                  style={{ background: "#96D4A3", borderRadius: "5px" }}
                >
                  RECOVERED
                </p>
                <p className="text-success font-weight-bolder">
                  <span className="font-weight-bold">
                    [+{T.deltarecovered}]
                  </span>
                </p>
                <h3 style={{ fontFamily: "Ubuntu" }} className="text-success">
                  {T.recovered}
                </h3>
                <i className="heartbeat green big icon mb-2"></i>
              </div>
              <div className="col text-center border-bottom border-secondary">
                <p
                  className="h6"
                  style={{ background: "#B1B6BA", borderRadius: "5px" }}
                >
                  DECEASED
                </p>
                <p className="text-secondary font-weight-bolder">
                  <span className="font-weight-bold">[+{T.deltadeaths}]</span>
                </p>
                <h3 style={{ fontFamily: "Ubuntu" }} className="text-secondary">
                  {T.deaths}
                </h3>
                <i className="heart grey outline big icon mb-2"></i>
              </div>
            </div>
          );
        }
      });
    }
  }
  renderDailyCase(Type) {
    if (this.props.States.cases_time_series) {
      this.DailyData = this.props.States.cases_time_series;
      if (Type === "C") {
        return (
          <h3 style={{ fontFamily: "Ubuntu" }} className="text-danger">
            {this.DailyData[this.DailyData.length - 1].dailyconfirmed}
          </h3>
        );
      }
      if (Type === "R") {
        return (
          <h3 style={{ fontFamily: "Ubuntu" }} className="text-success">
            {this.DailyData[this.DailyData.length - 1].dailyrecovered}
          </h3>
        );
      }
      if (Type === "D") {
        return (
          <h3 style={{ fontFamily: "Ubuntu" }} className="text-secondary">
            {this.DailyData[this.DailyData.length - 1].dailydeceased}
          </h3>
        );
      }
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
        <table className="table table-hover table-sm table-light table-bordered mt-2">
          <thead className="thead-light">
            <tr className="text-center mb-2">
              <th className="h6">STATES</th>
              <th className="text-danger h6">CONF</th>
              <th className="text-primary h6">ACTV</th>
              <th className="text-success h6">RECOV</th>
              <th className="text-secondary h6">DECD</th>
            </tr>
          </thead>
          <tbody><tr><td></td></tr>{this.renderState()}</tbody>
        </table>
        <div className="mt-3 mb-3">
          <p
            style={{ fontFamily: "Ubuntu" }}
            className="text-center h1 mt-4 mb-3 text-uppercase"
          >
            PREVIOUS DAY CASES
          </p>
          <div className="row shadow">
            <div
              style={{ background: "#FFE0E6" }}
              className="p-3 col text-center"
            >
              <p className="h6 text-danger">CONFIRMED</p>
              {this.renderDailyCase("C")}
            </div>
            <div
              style={{ background: "#E4F4E8" }}
              className="p-3 col text-center"
            >
              <p className="h6 text-success">RECOVERED</p>
              {this.renderDailyCase("R")}
            </div>
            <div
              style={{ background: "#F6F6F7" }}
              className="p-3 col text-center"
            >
              <p className="h6 text-secondary">DECEASED</p>
              {this.renderDailyCase("D")}
            </div>
          </div>
        </div>
        <Map />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DistrictWise: state.DistrictData,
    States: state.StateData,
  };
};
export default connect(mapStateToProps, { getStateWise, getDistrictWise })(
  StateList
);
