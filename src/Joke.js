import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div>
          <button>UP</button>
          <div>{this.props.votes}</div>
          <button>DOWN</button>
        </div>
        <p>{this.props.joke}</p>
        <img alt="smiley" />
      </div>
    );
  }
}

export default Joke;
