import '@fontsource/roboto';
import React, { setState } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;
const PERSON_KEY = process.env.REACT_APP_PERSON;
const MOVIE_KEY = process.env.REACT_APP_MOVIE;

class Helper extends React.Component {
  constructor() {
    super()
    this.state = {
      answer: "",
      actorAnswer: "",
      movieAnswer: ""
    }
  }

  setAnswer = (response) => {
    this.setState({ answer: response});
  }

  setActorResponse = (response) => {
    this.setState({ actorAnswer: response});
  }

  setMovieResponse = (response) => {
    this.setState({ movieAnswer: response});
  }

  fetchAnswerFunction = (randomActor) => {
    let myInit = {
      method: "GET",
      mode: "cors",
    };
    fetch(`${PERSON_KEY}${randomActor}/movie_credits?api_key=${API_KEY}`, myInit)
      .then(res => res.json())
        .then(response => {this.setAnswer(response)})
  }

  fetchPersonFunction = (randomActor) => {
    let myInit = {
      method: "GET",
      mode: "cors",
    };
    fetch(`${PERSON_KEY}${randomActor}?api_key=${API_KEY}`, myInit)
    .then(res => {
      return res.json();
      })
      .then(response => {this.setActorResponse(response.total)})
    return (this.actorAnswer)
  }

    fetchMovieFunction = (randomMovie) => {
      let myInit = {
        method: "GET",
        mode: "cors"
      };
      fetch(`${MOVIE_KEY}${randomMovie}?api_key=${API_KEY}`, myInit)
      .then(res => {
        return res.json();
        })
        .then(response => {this.setMovieResponse(response.total)}) 
      return (this.movieAnswer)
    }
}
export default Helper