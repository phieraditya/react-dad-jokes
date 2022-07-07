import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Joke from './Joke';
import './JokeList.css';

const API_URL = 'https://icanhazdadjoke.com/';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
    this.getNewJoke = this.getNewJoke.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }
  async getNewJoke() {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let response = await axios.get(API_URL, {
        headers: { Accept: 'application/json' },
      });
      jokes.push({ id: uuidv4(), joke: response.data.joke, votes: 0 });
    }
    this.setState({ jokes: jokes });
  }
  handleVote(id, delta) {
    this.setState((st) => ({
      jokes: st.jokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ),
    }));
  }
  render() {
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
          <button className="JokeList-getmore" onClick={this.getNewJoke}>
            New Jokes
          </button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map((j, idx) => (
            <Joke
              key={j.id}
              id={j.id}
              joke={j.joke}
              votes={j.votes}
              handleVote={this.handleVote}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
