import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';

export class News extends Component {
   
  static defaultProps = {
    country: "us",
    pageSize: 5,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  }

    capitalizeFirstLetter= (val)=> {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

      constructor(){
      super();
      console.log("hi");
      this.state = {
        articles: [],
        loading: false,
        page: 1
      }
    }


    async componentDidMount(){
      this.props.setProgress(0)
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c4d7bf4b523426095d3dbca6e53e651&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      this.props.setProgress(30)
      let parsedData = await data.json();
      this.props.setProgress(70)
      this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,
         loading: false
      })
      this.props.setProgress(100)
    }

    handlePrevClick = async ()=>{
       this.props.setProgress(0)
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c4d7bf4b523426095d3dbca6e53e651&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      this.props.setProgress(30)
      let parsedData = await data.json();
      this.props.setProgress(70)
       this.setState({
        page: this.state.page-1,
        articles: parsedData.articles,
        loading: false
       })
        this.props.setProgress(100)
    }

    handleNextClick = async ()=>{
      if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
       this.props.setProgress(0)  
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c4d7bf4b523426095d3dbca6e53e651&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      this.props.setProgress(30)
      let parsedData = await data.json();
      this.props.setProgress(70)
      this.setState({loading: false});
       this.setState({
        page: this.state.page+1,
        articles: parsedData.articles
       })}
        this.props.setProgress(100)
    }

  render() {
    return (
      <div className="container my-3 ">
        <h2>News Top Headlines-{this.capitalizeFirstLetter(this.props.category)}</h2>
        {/*this.state.loading &&<Spinner/>*/}
         <div className="row">
        {!this.state.loading &&this.state.articles.map((element)=>{
          return(
            <div className="col-md-4 py-3" key={element.url}>
            <NewsItem   title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""}  imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
          </div>
        )})}
       
         
        </div>
        <div className="container-fluid d-flex justify-content-end gap-2">
          <button disabled={this.state.page<=1}type="button" className="btn btn-info" onClick={this.handlePrevClick}>Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-info" onClick={this.handleNextClick}>Next</button>
        </div>
      </div>
    );
  }
}

export default News;
