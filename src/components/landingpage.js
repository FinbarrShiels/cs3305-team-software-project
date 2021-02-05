import React, { Component } from 'react';                   /*home page */
import handsUp from './handsUp.png';
import './landing.css'

class Default extends Component {
  render() {
    return(
    <main className="whoops">
      <img src = {handsUp}
            alt="Avatar"
            className="Avatar-img"
            />
            <div className="banner-text">
            <h1>Create and manage your own election.</h1>
            <hr/>
            <p>
              Info on our product .
            </p>
            </div>
  </main>
    )
  }
}

export default Default; 