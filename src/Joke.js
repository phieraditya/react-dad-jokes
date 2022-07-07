import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './Joke.css';

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <FontAwesomeIcon
            className="Joke-arrow"
            icon={faArrowUp}
            onClick={this.props.upvote}
          ></FontAwesomeIcon>
          <span className="Joke-votes">{this.props.votes}</span>
          <FontAwesomeIcon
            className="Joke-arrow"
            icon={faArrowDown}
            onClick={this.props.downvote}
          ></FontAwesomeIcon>
        </div>
        <div className="Joke-text">{this.props.joke}</div>
        <div className="Joke-smiley">
          <i className="em em-rolling_on_the_floor_laughing"></i>
        </div>
      </div>
    );
  }
}

export default Joke;
