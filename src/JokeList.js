import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh } from '@fortawesome/free-solid-svg-icons';
import Joke from './Joke';
import './JokeList.css';

const API_URL = 'https://icanhazdadjoke.com/';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      isLoading: false,
    };
    this.seenJokes = new Set(this.state.jokes.map((j) => j.joke));
    this.getNewJoke = this.getNewJoke.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) this.getNewJoke();
  }
  async getNewJoke() {
    try {
      let newJokes = [];

      while (newJokes.length < this.props.numJokesToGet) {
        let response = await axios.get(API_URL, {
          headers: { Accept: 'application/json' },
        });
        let newJoke = response.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          newJokes.push({ id: uuidv4(), joke: newJoke, votes: 0 });
        } else {
          console.log('FOUND A DUPLICATE!');
          console.log(newJoke);
        }
      }

      this.setState(
        (st) => ({ jokes: [...newJokes, ...st.jokes], isLoading: false }),
        () =>
          window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
    }
  }
  handleVote(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((j) =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        ),
      }),
      () =>
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }
  handleClick() {
    this.setState({ isLoading: true }, this.getNewJoke);
  }
  render() {
    if (this.state.isLoading) {
      return (
        <div className="JokeList-spinner">
          <FontAwesomeIcon
            icon={faLaugh}
            size="10x"
            spin
            inverse
          ></FontAwesomeIcon>
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      );
    }
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad </span>
            Jokes
          </h1>
          <img
            alt="laugh icon"
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          />
          <button className="JokeList-getmore" onClick={this.handleClick}>
            New Jokes
          </button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map((j, idx) => (
            <Joke
              key={j.id}
              joke={j.joke}
              votes={j.votes}
              upvote={() => this.handleVote(j.id, 1)}
              downvote={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
