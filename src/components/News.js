import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Loading from "./Loading";
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = { 
        pageSize : 5,
        country : 'in',
        category : 'general'
    }
    static propTypes = {
        pageSize : PropTypes.number.isRequired,
        country : PropTypes.string.isRequired,
        category: PropTypes.string,
    }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page:1

    };
  }


  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25589c1335904cea95c57d19ceb241b6&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
        loading:true
    })
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handleNextClick = async () => {
  
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25589c1335904cea95c57d19ceb241b6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({
        loading:true
    })
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false
    });

    
  };

  handlePrevClick = async() => {

    console.log("Prev")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25589c1335904cea95c57d19ceb241b6&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Loading/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled = {this.state.page+1>(Math.ceil(this.state.totalResults/this.props.pageSize))}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
