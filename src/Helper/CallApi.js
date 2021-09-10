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
      movieAnswer: {},
      errorMess: "",
      myInit: { method: "GET", mode: "cors" }
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
    console.log("IS SET = ",this.state.movieAnswer)
  }

  setErrorActor = (err) => {
    this.setState({errorMess: err})
  }

  fetchAnswerFunction = (randomMovie, randomActor) => {
    fetch(`${PERSON_KEY}${randomMovie}/credits?api_key=${API_KEY}`, this.myInit)
    .then(res => res.json())
    .then(response => {
      this.setAnswer(response.crew)
    })
    .catch(err => {
      this.setErrorActor(err.message);
    })
    let data = this.state.answer;
        for (let i=0; i < data.length; i++) {
          if (data[i].id === randomActor) {
            return 1;
          }
        }
        return 0;
  }

  fetchCalculateActor = (randomMovie) => {
    fetch(`${PERSON_KEY}${randomMovie}/credits?api_key=${API_KEY}`, this.myInit)
    .then(res => res.json())
    .then(response => {
      this.setAnswer(response.crew)
    }).catch(err => {
      this.setErrorActor(err.message);
    })
    let data = this.state.answer;
    let random = Math.floor(Math.random() * (100 - 1) + 1);
    while (random >= data.length) {
      random = Math.floor(Math.random() * (100 - 1) + 1);
    }
    return(this.fetchPersonFunction(Math.floor(data[random].id)));
  }

  fetchPersonFunction = (randomActor) => {
    fetch(`${PERSON_KEY}${randomActor}?api_key=${API_KEY}`, this.myInit)
    .then(res => {
      return res.json();
      })
      .then(response => {this.setActorResponse(response)
      })
      .catch(err => {
        this.setErrorActor(err.message);
      })
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
    })
    .catch(err => {
        this.setErrorActor(err.message);
      })
    return (this.state.movieAnswer)
  }
}
export default Helper