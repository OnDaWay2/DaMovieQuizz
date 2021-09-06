import '@fontsource/roboto';
import React, { setState } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;
const PERSON_KEY = process.env.REACT_APP_PERSON;
const MOVIE_KEY = process.env.REACT_APP_MOVIE;

class Helper extends React.Component {
  constructor() {
    super()
    this.state = {
      answer: [],
      actorAnswer: {},
      movieAnswer: {poster_path: ''},
      errorMess: "",
      myInit: {method: "GET", mode: "cors"}
    }
  }

componentDidMount(randomActor) {
  this.fetchMovieFunction(randomActor);
  this.fetchPersonFunction(randomActor);
}

  setAnswer = (response) => {
    this.setState({ answer: response});
  }

  setActorResponse = (response) => {
    this.setState({ actorAnswer: response});
  }

  setMovieResponse = (response) => {
    this.setState({ movieAnswer: response});
    console.log("get SET ? ",this.state.movieAnswer)
  }

  setErrorActor = (err) => {
    this.setState({errorMess: err})
  }

  fetchAnswerFunction = (randomActor) => {
    let data = this.state.movieAnswer;
    fetch(`${PERSON_KEY}${randomActor}/credits?api_key=${API_KEY}`, this.myInit)
      .then(res => res.json())
        .then(response => {
          this.setAnswer(response.crew)
        })
        let i=0;
        for (i=0; i < data.length; i++) {
          if (data[i].id === randomActor) {
            return 1;
          }
          i++;
        }
    return 0;
  }

  fetchPersonFunction = (randomActor) => {
    fetch(`${PERSON_KEY}${randomActor}?api_key=${API_KEY}`, this.myInit)
    .then(res => {
      return res.json();
      })
      .then(response => {this.setActorResponse(response.total)})
    return (this.state.actorAnswer)
  }

    fetchMovieFunction = (randomMovie) => {
      fetch(`${MOVIE_KEY}${randomMovie}?api_key=${API_KEY}`, this.myInit)
      .then(res => {
        return res.json();
      })
      .then(response => {
        this.setMovieResponse(response)
        console.log(response)
      }).catch(err => {
          this.setErrorActor(err.message);
        })
      return (this.state.movieAnswer)
    }
}
export default Helper