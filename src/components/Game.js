import React, { useState, useEffect } from "react";
import "./styles.css";
import ButtonYes from './buttonComponent/ButtonYes';
import ButtonNo from './buttonComponent/ButtonNo';
import ButtonRefresh from './buttonComponent/ButtonRefresh';
import '@fontsource/roboto';
import Helper from "../Helper/CallApi";


function Game() {

  const [page, setPage] = useState(1);
  const [point, setPoint] = useState(1);
  const [apiActorResponse, setApiActorResponse] = useState({profile_path: '' });
  const [apiMovieResponse, setApiMovieResponse] = useState({poster_path: ''});
  const [apiAnswerResponse, setAnswerResponse] = useState({id: '0'});
  const [errorActor, setErrorActor] = useState(null);
  const [errorMovie, setErrorMovie] = useState(null);
  const [randomActor, setRandomActor] = useState(Math.floor(Math.random() * (400 - 1) + 1));
  const [randomMovie, setRandomMovie] = useState(Math.floor(Math.random() * (400 - 1) + 1));
  const IMAGE_KEY = process.env.REACT_APP_IMAGE;

 
  function checkAnswerYes() {
    if (apiAnswerResponse.id !== undefined && apiAnswerResponse.id !== randomMovie)
      return 0;
    else
      return 1;
  };

  function checkAnswerNo() {
    if (apiAnswerResponse.id !== undefined && apiAnswerResponse.id === randomMovie)
      return 1;
    else
      return 0;
  };

  const loadCommitYes = () => {
    setPage(page + 1);
    setPoint(point + checkAnswerYes());
  };

  const loadCommitNo = () => {
    setPage(page + 1);
    setPoint(point + checkAnswerNo());
  };
  
  const refreshCommit = () => {
    setPage(page + 1);
  };
  
  useEffect(() => {
    const myInit = {
      method: "GET",
      mode: "cors", 
    };
    setRandomActor(Math.floor(Math.random() * (400 - 1) + 1));
    setRandomMovie(Math.floor(Math.random() * (400 - 1) + 1));
    let Help = new Helper(randomActor);
    console.log("MOVIE res = ",Help.fetchMovieFunction(randomMovie));
    console.log("ACTOR  res = ",Help.fetchPersonFunction(randomActor));
    console.log("_______________________")
}, [page]);
  return (
    <div>
        {apiActorResponse.profile_path !== null && apiMovieResponse.poster_path !== null}
        { !errorActor && !errorMovie ? 
          <div>
            <img className="photo" src={IMAGE_KEY+apiActorResponse.profile_path} alt={apiActorResponse.name}/>
            <img className="photo" src={IMAGE_KEY+apiMovieResponse.poster_path} alt={apiMovieResponse.title}/> <br/>
            <div onClick={loadCommitYes}><ButtonYes></ButtonYes></div>
            <div onClick={loadCommitNo}><ButtonNo></ButtonNo></div>

          </div> : 
          <div> 
            { !errorActor || !errorMovie ?
            <div>
              <p>could not fetch the data.</p>
            </div> : 
            errorActor && errorMovie && errorMovie } <br/>
            <div onClick={refreshCommit}><ButtonRefresh></ButtonRefresh></div>
          </div> 
        }
    </div>
  );
}

export default Game


    //   function fetchAnswerFunction() {
    //   const answer = fetch(`${PERSON_KEY}${randomActor}/movie_credits?api_key=${API_KEY}`, myInit)
    //   .then(res => res.json())
    //   .then(response => {
    //     setAnswerResponse(response.crew);
    //   }).catch(err => {
    //     setErrorActor(err.message);
    //   })
    // }


    // function fetchPersonFunction() {
    //     setRandomActor(Math.floor(Math.random() * (400 - 1) + 1));
    //     const actor = fetch(`${PERSON_KEY}${randomActor}?api_key=${API_KEY}`, myInit)
    //     .then(res => {
    //       if (!res.ok)
    //         throw Error('could not fetch the data.')
    //       return res.json();
    //     })
    //     .then(response => {
    //       setApiActorResponse(response);
    //       setErrorActor(null);
    //     }).catch(err => {
    //       setErrorActor(err.message);
    //   })
        
    // }

    // function fetchMovieFunction() {
    //   setRandomMovie(Math.floor(Math.random() * (400 - 1) + 1));
    //     const movie = fetch(`${MOVIE_KEY}${randomMovie}?api_key=${API_KEY}`, myInit)
    //     .then(res => {
    //       if (!res.ok || res.poster_path === null)
    //         throw Error('could not fetch the data.')
    //       return res.json();
    //     })
    //     .then(response => {
    //       setApiMovieResponse(response);  
    //       setErrorMovie(null);
    //       }).catch(err => {
    //         setErrorMovie(err.message);
    //     })
    // }