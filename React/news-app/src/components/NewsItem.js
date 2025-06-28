import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img src={imageUrl?imageUrl:"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
             {description}...
            </p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
