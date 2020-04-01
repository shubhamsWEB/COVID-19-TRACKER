import React from "react";
import { connect } from "react-redux";
import { getNews } from "../actions";
import Moment from "react-moment";

class NewsList extends React.Component {
  componentDidMount() {
    this.props.getNews();
  }
  renderNews = () => {
    if (this.props.News.articles) {
      return this.props.News.articles.map(N => {
        return (
            <React.Fragment>
          <div className="ui segment items">
            <div className="item">
              <div className="image">
                <img src={N.urlToImage} />
              </div>
              <div className="content">
                <a href={N.url} target="_blank" className="header">
                  {N.title}
                </a>
                <div className="description">
                  <h5>{N.description}</h5>
                </div>
                <div className="extra">
                  <div className="meta">
                    <span>
                      Source:<strong>{N.source.name}</strong>
                    </span>
                    <span className="ui right floated">
                      <Moment fromNow>{N.publishedAt}</Moment>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </React.Fragment>
        );
      });
    }
  };
  render() {
    return <>{this.renderNews()}</>;
  }
}
const mapStateToProps = state => {
  return {
    News: state.News
  };
};
export default connect(mapStateToProps, { getNews })(NewsList);
