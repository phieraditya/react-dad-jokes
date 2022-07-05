import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

const API_URL = 'https://icanhazdadjoke.com/';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
    this.getNewJoke = this.getNewJoke.bind(this);
  }
  async getNewJoke() {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let response = await axios.get(API_URL, {
        headers: { Accept: 'application/json' },
      });
      jokes.push(response.data.joke);
    }
    this.setState({ jokes: jokes });
  }
  render() {
    return (
      <div className="JokeList">
        <section className="JokeList-left">
          <h1>
            <span>Dad </span>
            <span>Jokes</span>
          </h1>
          <h2>BIG SMILEY</h2>
          <button onClick={this.getNewJoke}>New Jokes</button>
        </section>
        <section className="JokeList-right">
          <Joke />
        </section>
      </div>
    );
  }
}

export default JokeList;
