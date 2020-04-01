import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="ui center aligned segment">
        <div className="ui labeled button" tabIndex="0">
          <div className="ui basic black button">
            <i className="fork large icon"></i><a style={{color: 'black'}} href="https://github.com/shubhamsWEB/COVID-19-TRACKER"><strong>FORK</strong></a>
          </div>
          <a className="ui basic left pointing black label"><i class="github large icon"></i></a>
        </div>
        <div className="ui labeled button" tabIndex="0">
          <div className="ui basic blue button">
            <a style={{color: '#398CCB'}} href="https://telegra.ph/Covid-19-Sources-03-19"><strong>DATA SOURCE</strong></a>
          </div>
          <a className="ui basic left pointing blue label"><i class="database large icon"></i></a>
        </div><br/><br />
        <div className="ui labeled button" tabIndex="0">
          <div className="ui basic teal button">
            <a style={{color: 'teal'}} href="http://shubhamsweb.in"><strong>SHUBHAM AGRAWAL</strong></a>
          </div>
          <a className="ui basic left pointing teal label"><i class="globe large icon"></i></a>
        </div>
      </div>
    );
  }
}
export default Footer;
