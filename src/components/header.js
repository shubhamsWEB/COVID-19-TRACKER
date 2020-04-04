import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends React.Component {
  renderTime() {
    if (Object.values(this.props.States).length > 0) {
      return this.props.States.key_values.map(time => {
        return (
          <span key="1" className="navbar-text">
            <p className="text-success">{time.lastupdatedtime}</p>
          </span>
        );
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <nav className="navbar text-center navbar-expand-lg navbar-light bg-light">
          <button
            class="navbar-toggler"
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
                <Link to="/MapStats" className="nav-link">
                  <h6>MAP STATS</h6>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Symptoms" className="nav-link">
                  <h6>SYMPTOMS</h6>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/QnA" className="nav-link">
                  <h6>Q&A</h6>
                </Link>
              </li>
            </ul>
            <div>Last Updated at: {this.renderTime()}</div>
          </div>
        </nav>
        <div class="jumbotron text-center p-4 mb-0 jumbotron-fluid">
          <div class="container">
            <h1 class="h5">
              “We make a living by what we get, But we make a life by what we
              give.”
            </h1>
            <a
              href="https://www.pmindia.gov.in/en/?query#" target="_blank"
              class="m-1 btn btn-outline-success"
            >
              <i class="certificate icon"></i>
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
