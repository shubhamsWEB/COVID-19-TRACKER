import React from "react";
import Header from "./header";
import Footer from "./footer";
import Home from "./home";
import Symptoms from "./Symptoms";
import Map from "./Map";
import QnA from "./QnA";
import { BrowserRouter, Route } from "react-router-dom";
const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/MapStats" exact component={Map} />
        <Route path="/Symptoms" exact component={Symptoms} />
        <Route path="/QnA" exact component={QnA} />
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  );
};
export default App;
