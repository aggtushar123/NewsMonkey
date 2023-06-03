import React, { Component } from 'react'
import loading from './ZKZg.gif'
export class Loading extends Component {
  render() {
    return (
      <div className="text-center" style={{}}>
        <img src = {loading} alt = "loding"/>
      </div>
    )
  }
}

export default Loading
