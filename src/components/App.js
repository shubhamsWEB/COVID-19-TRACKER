import React from "react";
import Header from "./header";
import StateList from "./StateList";
import NewsList from "./NewsList";
import Footer from "./footer";
const App = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="ui container">
        <div className="ui stackable two column grid container">
          <div className="column">
            <StateList />
          </div>
          <div className="column">
            <div className="ui one huge statistics">
              <div className="statistic">
                <div className="value">NEWS</div>
                <div className="label">BULLETIN</div>
              </div>
            </div>
            <NewsList />
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default App;
