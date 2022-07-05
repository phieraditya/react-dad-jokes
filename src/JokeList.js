import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

const API_URL = 'https://icanhazdadjoke.com/';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.getNewJoke = this.getNewJoke.bind(this);
  }
  async getNewJoke() {
    let response = await axios.get(API_URL, {
      headers: { Accept: 'application/json' },
    });
    console.log(response.data.joke);
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
