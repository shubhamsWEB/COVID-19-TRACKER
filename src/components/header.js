import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class Header extends React.Component {
  renderTime() {
    if (Object.values(this.props.States).length > 0) {
      return this.props.States.statewise.map(time => {
        if(time.state === 'Total') {
          var day = time.lastupdatedtime.toString().slice(0,2);
          var month = time.lastupdatedtime.toString().slice(3,5);
          var year = time.lastupdatedtime.toString().slice(6,10);
          var time = time.lastupdatedtime.toString().split(" ")[1];
          var newDate = year + "/" + month + "/" + day + " " + time;
          console.log(newDate);
        return (
          <span key="1" className="navbar-text">
            <p className="text-success h6"><Moment fromNow>{newDate}</Moment></p>
          </span>
        );
        }
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <nav className="navbar text-center navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <h6>HOME</h6>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Covid19/Stats" className="nav-link">
                  <h6>STATISTICS</h6>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Covid19/Symptoms" className="nav-link">
                  <h6>SYMPTOMS</h6>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Covid19/QnA" className="nav-link">
                  <h6>Q&A</h6>
                </Link>
              </li>
            </ul>
            <div>Last Updated  {this.renderTime()}</div>
          </div>
        </nav>
        <div className="jumbotron text-center p-4 mb-0 jumbotron-fluid">
          <div className="container">
            <h1 className="h5">
              “We make a living by what we get, But we make a life by what we
              give.”
            </h1>
            <a  rel="noopener noreferrer"
              href="https://www.pmindia.gov.in/en/?query#" target="_blank"
              className="m-1 btn btn-outline-success"
            >
              <i className="certificate icon"></i>
              <span className="h6">PM CARES FUND</span>
            </a>
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
