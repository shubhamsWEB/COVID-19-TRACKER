import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div class="card text-center">
          <div class="card-body">
            <h6 class="card-title text-uppercase">"This too shall pass,Keep Clam and Stay Safe"</h6>
            <a
              href="https://github.com/shubhamsWEB/COVID-19-TRACKER"
              class="m-1 btn btn-outline-dark"
            >
              <i class="database icon"></i><span className="h6">DATA SOURCE</span>
            </a>
            <a
              href="https://newsapi.org/"
              class="m-1 btn btn-outline-dark"
            >
              <i class="newspaper icon"></i><span className="h6">NEWS SOURCE</span>
            </a><br/>
            <a
              href="http://shubhamsweb.in"
              class="m-1 btn text-center"
            >
              <i class="globe olive circular large icon"></i>
            </a>
            <a
              href="https://twitter.com/hashtag/covid19"
              class="m-1 btn text-center"
            >
              <i class="twitter circular teal large icon"></i>
            </a>
            <a
              href="https://github.com/shubhamsWEB/COVID-19-TRACKER"
              class="btn text-center"
            >
              <i class="github circular large icon"></i>
            </a>
            <a
              href="https://t.me/MyGovCoronaNewsDesk"
              class="btn text-center"
            >
              <i class="telegram blue circular large icon"></i>
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Footer;
