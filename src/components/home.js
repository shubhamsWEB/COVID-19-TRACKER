import React from "react";
import StateList from "../components/StateList";
import NewsList from "../components/NewsList";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="display-4 text-center">
                <strong>COVID-19 TRACKER</strong>
              </h1>
              <h5 className="text-center">
                <mark>STAY HOME , STAY SAFE</mark>
              </h5>
              <br />
              <StateList />
            </div>
            <div className="col-md-6">
              <h1 className="display-4 text-center">
                <strong>NEWS BULLETIN</strong>
              </h1>
              <h5 className="text-center">
                <mark>LIVE UPDATES</mark>
              </h5>
              <br />
              <NewsList />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Home;
