import React from "react";
import StateList from "../components/StateList";
import NewsList from "../components/NewsList";
import Map from "../components/Map";
class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="display-4 font-weight-normal text-center">
                COVID-19 TRACKER
              </h1>
              <h5 className="text-center">
                <mark>STAY HOME , STAY SAFE</mark>
              </h5>
              <br />
              <StateList />
              <Map />
            </div>
            <div className="col-md-6">
              <h1 className="display-4 text-center font-weight-normal">
                NEWS BULLETIN
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
