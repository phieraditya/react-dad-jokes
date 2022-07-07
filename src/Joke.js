import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './Joke.css';

class Joke extends Component {
  getColor() {
    if (this.props.votes >= 15) {
      return '#4CAF50';
    } else if (this.props.votes >= 12) {
      return '#8BC34A';
    } else if (this.props.votes >= 9) {
      return '#CDDC39';
    } else if (this.props.votes >= 6) {
      return '#FFEB3B';
    } else if (this.props.votes >= 3) {
      return '#FFC107';
    } else if (this.props.votes >= 0) {
      return '#FF9800';
    } else {
      return '#f44336';
    }
  }
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <FontAwesomeIcon
            className="Joke-arrow"
            icon={faArrowUp}
            onClick={this.props.upvote}
          ></FontAwesomeIcon>
          <span className="Joke-votes" style={{ borderColor: this.getColor() }}>
            {this.props.votes}
          </span>
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
