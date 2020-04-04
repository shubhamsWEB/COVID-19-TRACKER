import React from "react";
import { Chart } from "react-google-charts";
import { connect } from "react-redux";
import { getStateWise } from "../actions/index";
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = [];
    this.DataObj = {};
    this.array = [['States','Tota Cases','Deaths']];
  }
  componentDidMount() {
    this.props.getStateWise();
  }
  renderData() {
    if (this.props.States.statewise) {
      return this.props.States.statewise.map(State => {
        if (State.state !== "Total") {
        if(State.state ==='Odisha') {
          this.array.push(['Orissa',parseInt(State.confirmed),parseInt(State.deaths)]);
        }
        this.array.push([State.state,parseInt(State.confirmed),parseInt(State.deaths)]);
        }    
    });
    }
  }
  render() {
    if (!this.props.States.statewise) {
        return <div>Loading..</div>
    }
      this.renderData();
      console.log(this.array);
      return (
        <React.Fragment>
          <div className="container">
      <p className="h1 text-center">Total {this.array.length -2} States Affected</p>
            <Chart
              width={"100%"}
              height={"100%"}
              chartType="GeoChart"
              data={this.array}
              options={{
                region: "IN",
                displayMode: "regions",
                resolution: "provinces",
                colorAxis: { colors: ["#FA8072", "#ED2939", "#7C0A02"] },
                backgroundColor: "#81d4fa",
                datalessRegionColor: "#f8bbd0",
                defaultColor: "#f5f5f5"
              }}
              mapsApiKey="AIzaSyCMR0QJHjwcJbWBRtHc_qUKvdULXs8AfFU"
            />
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
export default connect(mapStateToProps, { getStateWise })(Map);
