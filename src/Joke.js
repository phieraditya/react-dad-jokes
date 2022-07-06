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
            icon={faArrowUp}
            onClick={this.handleVote}
          ></FontAwesomeIcon>
          <span>{this.props.votes}</span>
          <FontAwesomeIcon
            icon={faArrowDown}
            onClick={this.handleVote}
          ></FontAwesomeIcon>
        </div>
        <div className="Joke-text">{this.props.joke}</div>
        <img alt="smiley" />
      </div>
    );
  }
}

export default Joke;
