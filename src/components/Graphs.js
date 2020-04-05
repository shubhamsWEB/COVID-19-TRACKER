import React from "react";
import { Chart } from "react-google-charts";
import { connect } from "react-redux";
import { getStateWise } from "../actions/index";
class Graphs extends React.Component {
  constructor(props) {
    super(props);
    this.dailydata = [
      ["Cases in Previous 15 days", "Confirmed", "Recovered", "Deceased"],
    ];
    this.piedata = [["States", "Cases"]];
  }
  componentDidMount() {
    this.props.getStateWise();
  }
  renderDailyData = () => {
    if (this.props.States.cases_time_series) {
      return this.props.States.cases_time_series
        .reverse()
        .slice(0, 15)
        .map((D, key) => {
          if (D.dailyconfirmed !== 0) {
            if(this.dailydata.length <16) {
            this.dailydata.push([
              D.date,
              parseInt(D.dailyconfirmed),
              parseInt(D.dailyrecovered),
              parseInt(D.dailydeceased),
            ]);
          }
          }
        });
    }
  };
  renderPieData = () => {
    if (Object.values(this.props.States.statewise).length > 0) {
      return this.props.States.statewise.map((D) => {
        if (D.state !== "Total") {
          
          if (
            this.piedata.length <
            Object.values(this.props.States.statewise).length
          ) {
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
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12 container p-2">
            <h3 className="text-center mb-2 mt-2">Daily Cases Report</h3>
            <Chart
              width={"100%"}
              height={"500px"}
              chartType="ComboChart"
              loader={<div>Loading Chart</div>}
              data={this.dailydata}
              options={{
                title: "Cases Recorded in previous 15 days",
                vAxis: { title: "Cases" },
                hAxis: { title: "Days" },
                seriesType: "bars",
                series: { 5: { type: "line" } },
              }}
            />
          </div>
          <div className="col-md-6 col-sm-12 container p-2">
            <h3 className="text-center mb-2 mt-2">Affected States</h3>
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
