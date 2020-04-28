import React from "react";
import { connect } from "react-redux";
import { getStateWise, getDistrictWise } from "../actions";
import "../css/StateList.css";
import Map from "./Map";
import NumberFormat from "react-number-format"; 
import Moment from "react-moment";

class StateList extends React.Component {
  constructor(props) {
    super(props);
    this.DailyData = [];
    this.affectedStates = 0;
    this.state = {TotalStatesAffected: 0};
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
            <strong>&uarr;{State.deltaconfirmed}</strong>
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
            <strong>&uarr;{State.deltaconfirmed}</strong>
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
            <strong>&uarr;{State.deltarecovered}</strong>
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
            <strong>&uarr;{State.deltadeaths}</strong>
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
            <strong><i className="arrow up small icon"></i>{District[1].delta.confirmed}</strong>
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
              <tr>
                <td style={{borderRadius: '10px'}} className="color-gray">
                  <p className="h6">{District[0]}</p>
                </td>
                <td style={{borderRadius: '10px'}} className="color-gray">
                  <p className="h6">
                    <NumberFormat value={District[1].confirmed} displayType={'text'} thousandSeparator={true} />
                     {this.renderDistrictDelta(District)}
                     </p>
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
          var tar = `#covid19${key}`;
          var id = `covid19${key}`;
          var iconid = `corona${key}`;
          return (
            <React.Fragment key={key}>
              <tr data-toggle="collapse"
                  data-target={tar} style={{ cursor: "pointer" }} onClick={() => this.click(iconid)}>
                <td style={{borderRadius: '10px'}}
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
                <td style={{borderRadius: '10px'}} className="color-gray">
                  <span className="h6">
                    <NumberFormat value={State.confirmed} thousandSeparator={true} displayType={'text'} />
                    </span>
                  {this.renderComfirmed(State)}
                </td>
                <td style={{borderRadius: '10px'}} className="color-gray">
                  <span className="h6">
                  <NumberFormat value={State.active} thousandSeparator={true} displayType={'text'} />
                  </span>
                  {this.renderActive(State)}
                </td>
                <td style={{borderRadius: '10px'}} className="color-gray">
                  <span className="h6">
                  <NumberFormat value={State.recovered} thousandSeparator={true} displayType={'text'} />
                    </span>
                  {this.renderRecovered(State)}
                </td>
                <td style={{borderRadius: '10px'}} className="color-gray">
                  <span className="h6">
                  <NumberFormat value={State.deaths} thousandSeparator={true} displayType={'text'} />
                    </span>
                  {this.renderDeaths(State)}
                </td>
              </tr>

              <td colSpan="3">
                <div className="collapse" id={id}>
                    <table className="table table-sm">
                      <thead className="thead-light">
                        <tr>
                          <th className="h6">DISTRICTS</th>
                          <th className="h6 text-danger">CONFIRMED</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderDistrict(State.state)}</tbody>
                    </table>
                </div>
              </td>
            </React.Fragment>
          );
        }
      });
    }
  };
  renderAffecterStates() {
    var affected =0;
    if(this.props.States.statewise) {
      this.props.States.statewise.map(State => {
        if(State.confirmed !== '0') {
          affected +=1;
        }
      })
    }
    return affected -1;
  }
  renderTotal() {
    if (this.props.States.statewise) {
      return this.props.States.statewise.map((T) => {
        if (T.state === "Total") {
          return (
            <div className="row" key={T.state}>
              <div className="col text-center border-bottom border-danger shadow-hover">
                <p
                  className="h6"
                  style={{ background: "#FF6B89", borderRadius: "5px" }}
                >
                  CONFIRMED
                </p>
                <p className="text-danger">
                  <span style={{color: '#FF6B89',fontFamily: "Ubuntu"}} className="font-weight-bold delta-text">
                    [+{T.deltaconfirmed}]
                  </span>
                </p>
                <h3 style={{ fontFamily: "Ubuntu" }} className="text-danger total-text">
                <NumberFormat value={T.confirmed} displayType={'text'} thousandSeparator={true} />
                </h3>
                <i className="medkit red big icon mb-2"></i>
              </div>
              <div className="col text-center border-bottom border-primary shadow-hover">
                <p
                  className="h6"
                  style={{ background: "#8EC5FF", borderRadius: "5px" }}
                >
                  ACTIVE
                </p>
                <p className="text-danger font-weight-bolder">
                  <span style={{color: '#8EC5FF',fontFamily: "Ubuntu"}} className="delta-text font-weight-bold">
                    [+{T.deltaconfirmed}]
                  </span>
                </p>
                <h3 style={{ fontFamily: "Ubuntu" }} className="text-primary total-text">
                <NumberFormat value={T.active} displayType={'text'} thousandSeparator={true} />
                </h3>
                <i className="hospital blue outline big icon mb-2"></i>
              </div>
              <div className="col text-center border-bottom border-success shadow-hover">
                <p
                  className="h6"
                  style={{ background: "#96D4A3", borderRadius: "5px" }}
                >
                  RECOVERED
                </p>
                <p className="text-success font-weight-bolder">
                  <span style={{color: '#96D4A3',fontFamily: "Ubuntu"}} className="delta-text font-weight-bold">
                    [+{T.deltarecovered}]
                  </span>
                </p>
                <h3 style={{ fontFamily: "Ubuntu" }} className="text-success total-text">
                <NumberFormat value={T.recovered} displayType={'text'} thousandSeparator={true} />
                </h3>
                <i className="heartbeat green big icon mb-2"></i>
              </div>
              <div className="col text-center border-bottom border-secondary shadow-hover">
                <p
                  className="h6"
                  style={{ background: "#B1B6BA", borderRadius: "5px" }}
                >
                  DECEASED
                </p>
                <p className="text-secondary font-weight-bolder">
                  <span style={{color: '#B1B6BA',fontFamily: "Ubuntu"}} className="delta-text font-weight-bold">[+{T.deltadeaths}]</span>
                </p>
                <h3 style={{ fontFamily: "Ubuntu" }} className="text-secondary total-text">
                <NumberFormat value={T.deaths} displayType={'text'} thousandSeparator={true} />
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
          <NumberFormat value={this.DailyData[this.DailyData.length - 1].dailyconfirmed} thousandSeparator={true} displayType={'text'} />
          </h3>
        );
      }
      if (Type === "R") {
        return (
          <h3 style={{ fontFamily: "Ubuntu" }} className="text-success">
          <NumberFormat value={this.DailyData[this.DailyData.length - 1].dailyrecovered} thousandSeparator={true} displayType={'text'} />
          </h3>
        );
      }
      if (Type === "D") {
        return (
          <h3 style={{ fontFamily: "Ubuntu" }} className="text-secondary">
          <NumberFormat value={this.DailyData[this.DailyData.length - 1].dailydeceased} thousandSeparator={true} displayType={'text'} />
          </h3>
        );
      }
      if (Type === "Date") {
        return (
          <p style={{ fontFamily: "Ubuntu",fontSize: "1rem" }} className="text-center lead">
            {this.DailyData[this.DailyData.length - 1].date}
          </p>
        );
      }
    }
  }
  renderTime() {
    if (Object.values(this.props.States).length > 0) {
      return this.props.States.statewise.map(time => {
        if(time.state === 'Total') {
          var day = time.lastupdatedtime.toString().slice(0,2);
          var month = time.lastupdatedtime.toString().slice(3,5);
          var year = time.lastupdatedtime.toString().slice(6,10);
          var time = time.lastupdatedtime.toString().split(" ")[1];
          var newDate = year + "/" + month + "/" + day + " " + time;
        return (
          <span key="1" style={{color: '#96D5A5' ,fontFamily: 'Ubuntu'}} className="h6">
            Last Updated <Moment fromNow>{newDate}</Moment>
          </span>
        );
        }
      });
    }
  }
  render() {
    if (!this.props.States || !this.props.DistrictWise) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <p className="text-center mt-0">{this.renderTime()}</p>
        {this.renderTotal()}
        <table className="table table-hover table-striped table-sm table-light mt-2">
          <thead className="thead-light">
            <tr>
              <th className="text-center">STATES</th>
              <th className="text-danger">CONF</th>
              <th className="text-primary">ACTV</th>
              <th className="text-success">RECOV</th>
              <th className="text-secondary">DECD</th>
    </tr>
          </thead>
          <tbody>
            <tr>
    <td className="text-secondary text-center font-weight-bold" colSpan="5">Total States/UT's Affected : {this.renderAffecterStates()}</td>
            </tr>
            {this.renderState()}
          </tbody>
        </table>
        <div className="mt-3 mb-3 p-2">
          <p
            style={{ fontFamily: "Ubuntu" }}
            className="text-center h1 mt-4 mb-3 text-uppercase"
          >
            PREVIOUS DAY CASES
          </p>
          {this.renderDailyCase("Date")}
          <div className="row shadow-sm">
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
        <div className="mb-3">
        <Map />
        </div>
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
