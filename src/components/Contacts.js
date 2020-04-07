import React from "react";
import { getContacts, getStateWise } from "../actions";
import { connect } from "react-redux";
class Contacts extends React.Component {
  componentDidMount() {
    this.props.getContacts();
    this.props.getStateWise();
  }
  renderContacts() {
    if (this.props.Contacts.data) {
      return this.props.Contacts.data.contacts.regional.map((Contact) => {
        return (
          <div className="col-md-3 mt-3 mb-3" key={Contact.loc}>
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h5 style={{ fontFamily: "Ubuntu" }} className="card-title">{Contact.loc}</h5>
                <p className="card-text font-weight-bold text-secondary">
                  {Contact.number}
                </p>
                <a href="#" className="btn btn-outline-success">
                  Help Line
                </a>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  render() {
    if (this.props.Contacts.data) {
      var Num = this.props.Contacts.data.contacts.primary.number;
    }
    return (
      <div className="container">
        <div
          style={{ background: "#E4F4E8" }}
          className="jumbotron text-center p-4 mb-0 mt-3 shadow-sm jumbotron-fluid"
        >
          <div className="container">
            <p style={{ fontFamily: "Ubuntu" }} className="h4">Central Help Line Number</p>
            <a
              rel="noopener noreferrer"
              className="m-1 btn btn-outline-success text-success"
            >
              <i className="phone icon"></i>
              <span className="h6">{Num}</span>
            </a>
            <a
              rel="noopener noreferrer"
              className="m-1 btn btn-outline-success text-success"
            >
              <i className="phone icon"></i>
              <span className="h6">TollFree Num. 1075</span>
            </a><br />
            <a style={{textDecoration: 'none'}} href ="https://www.facebook.com/MoHFWIndia" target="_blank"><i className="blue facebook large icon mt-2"></i></a>
            <a style={{textDecoration: 'none'}} href ="https://twitter.com/MoHFW_INDIA" target="_blank"><i className="teal twitter square large icon mt-2"></i></a>
          </div>
        </div>
        <div className="row mt-3">{this.renderContacts()}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    Contacts: state.Contacts,
  };
};
export default connect(mapStateToProps, { getContacts, getStateWise })(
  Contacts
);
