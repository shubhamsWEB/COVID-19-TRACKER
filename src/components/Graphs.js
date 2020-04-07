import React from "react";
import { Chart } from "react-google-charts";
import { connect } from "react-redux";
import { getStateWise } from "../actions/index";
class Graphs extends React.Component {
  constructor(props) {
    super(props);
    this.dailydata = [
      ["Cases","Recovered","Confirmed", "Deceased"],
    ];
    this.piedata = [];
  }
  componentDidMount() {
    this.props.getStateWise();
  }
  renderDailyData = () => {
    this.dailydata = [
      ["Cases","Recovered","Confirmed", "Deceased"],
    ];
    if (this.props.States.cases_time_series) {
      return this.props.States.cases_time_series
        .reverse()
        .slice(0, 15)
        .map(D => {
          if (D.dailyconfirmed !== 0) {
            if(this.dailydata.length <16) {
            this.dailydata.push([
              D.date,
              parseInt(D.dailyrecovered),
              parseInt(D.dailyconfirmed),
              parseInt(D.dailydeceased),
            ]);
          }
          }
        });
    }
  };
  renderPieData = () => {
    this.piedata = [["States", "Cases"]];
    if (Object.values(this.props.States.statewise).length > 0) {
      return this.props.States.statewise.map((D) => {
        if (D.state !== "Total" && D.confirmed > 0) {
          if (this.piedata.length < Object.values(this.props.States.statewise).length) {  
            this.piedata.push([D.state, parseInt(D.confirmed)]);
          }
        }
      });
    }
  };
  render() {
    if (this.props.States.statewise) {
      this.renderPieData();
      this.renderDailyData();
    }
    if (!this.props.States.statewise) {
      return (<div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12 container p-2">
            <h3 style={{fontFamily: 'Ubuntu'}} className="text-center mb-2 mt-2">Daily Cases Report</h3>
            <Chart
              width={"100%"}
              height={"500px"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={this.dailydata}
              options={{
                title: "Cases Recorded in previous 15 days",
                vAxis: { title: "Cases" },
                hAxis: { title: "Date" },
               
              }}
            />
          </div>
          <div className="col-md-6 col-sm-12 container p-2">
            <h3 style={{fontFamily: 'Ubuntu'}} className="text-center mb-2 mt-2">Affected States & UT's ({this.piedata.length-1})</h3>
            <Chart
              width={"100%"}
              height={"500px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={this.piedata}
              options={{
                title: "Most Affected States",
                is3D: true,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    States: state.StateData,
  };
};
export default connect(mapStateToProps, { getStateWise })(Graphs);
