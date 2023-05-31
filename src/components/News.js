import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {
//    articles = [{

//    }]
    
    constructor(){
        console.log("cons")
       super();
       this.state = {
        articles: [],
        loading: false 
       }
    }

    async componentDidMount() {
        let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=25589c1335904cea95c57d19ceb241b6'
        let data = await fetch(url)
        let parsedData = await data.json()
        
        this.setState({
            articles: parsedData.articles
        }) 
    }


  render() {
    return (
      <div className='container my-3'>
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
        <NewsItems title={element.title} description = {element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
        })}
    
        </div>
      </div>
    )
  }
}

export default News
