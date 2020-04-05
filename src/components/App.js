import React from "react";
import Header from "./header";
import Footer from "./footer";
import Home from "./home";
import Symptoms from "./Symptoms";
import Graphs from "./Graphs";
import QnA from "./QnA";
import { HashRouter, Route } from "react-router-dom";
const App = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <Header />
          <Route path="/" exact component={Home} />
          <Route path="/Covid19/Stats" exact component={Graphs} />
          <Route path="/Covid19/Symptoms" exact component={Symptoms} />
          <Route path="/Covid19/QnA" exact component={QnA} />
      </HashRouter>
      <Footer />
    </React.Fragment>
  );
};
export default App;
