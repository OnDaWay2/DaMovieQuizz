import React, { useState, useEffect } from "react";
import "./styles.css";
import ButtonYes from './buttonComponent/ButtonYes';
import ButtonNo from './buttonComponent/ButtonNo';
import ButtonRefresh from './buttonComponent/ButtonRefresh';
import '@fontsource/roboto';
import Helper from "../Helper/CallApi";


function Game() {

  const [page, setPage] = useState(1);
  const [point, setPoint] = useState(0);
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
    let randomPick = 1; //Math.floor(Math.random() * (500 - 1) + 1)
    let Help = new Helper(randomActor);
    
    setRandomActor(Math.floor(Math.random() * (500 - 1) + 1));
    setRandomMovie(Math.floor(Math.random() * (500 - 1) + 1));
    console.log("MOVIE res = ",Help.fetchMovieFunction(randomMovie));
    if (randomPick % 2 === 0) {
      Help.fetchCalculateActor(randomMovie);
    } else {
      console.log("ACTOR  res = ",Help.fetchPersonFunction(randomActor));
    }
    setPoint(Help.fetchAnswerFunction(randomMovie, randomActor) + point);
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