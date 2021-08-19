import React, { useState, useEffect } from "react";
import "./styles.css";

function Game() {
  const API_KEY_MOVIE_DB = '7ea5f490261a949e52930517e1b4657c';
  const [page, setPage] = useState(1);
  const [point, setPoint] = useState(1);
  const [apiActorResponse, setApiActorResponse] = useState({profile_path: '' });
  const [apiMovieResponse, setApiMovieResponse] = useState({poster_path: ''});
  const [apiAnswerResponse, setAnswerResponse] = useState({id: '0'});
  const [errorActor, setErrorActor] = useState(null);
  const [errorMovie, setErrorMovie] = useState(null);
  const [randomActor, setRandomActor] = useState(parseInt(Math.random()));
  const [randomMovie, setRandomMovie] = useState(parseInt(Math.random()));

 
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
    localStorage.setItem(`point`, point);
  };

  const loadCommitNo = () => {
    setPage(page + 1);
    setPoint(point + checkAnswerNo());
    localStorage.setItem(`point`, point);
  };
  
  const refreshCommit = () => {
    setPage(page + 1);
  };
  
  useEffect(() => {
    
    
    const myInit = {
      method: "GET",
      mode: "cors", 
    };

      function fetchAnswerFunction() {
      const answer = fetch(`https://api.themoviedb.org/3/person/${randomActor}/movie_credits?api_key=${API_KEY_MOVIE_DB}`, myInit)
      .then(res => res.json())
      .then(response => {
        setAnswerResponse(response.crew);
        //localStorage.setItem(`Answer:${randomActor}`, JSON.stringify(response))
      }).catch(err => {
        setErrorActor(err.message);
      })
    }


    function fetchPersonFunction() {
        setRandomActor(Math.floor(Math.random() * (400 - 1) + 1));
        const actor = fetch(`https://api.themoviedb.org/3/person/${randomActor}?api_key=${API_KEY_MOVIE_DB}`, myInit)
        .then(res => {
          if (!res.ok)
            throw Error('could not fetch the data.')
          return res.json();
        })
        .then(response => {
          setApiActorResponse(response);
          setErrorActor(null);
        }).catch(err => {
          setErrorActor(err.message);
      })
        
    }
    function fetchMovieFunction() {
      setRandomMovie(Math.floor(Math.random() * (400 - 1) + 1));
        const movie = fetch(`https://api.themoviedb.org/3/movie/${randomMovie}?api_key=${API_KEY_MOVIE_DB}`, myInit)
        .then(res => {
          if (!res.ok || res.poster_path === null)
            throw Error('could not fetch the data.')
          return res.json();
        })
        .then(response => {
          setApiMovieResponse(response);  
          setErrorMovie(null);
          }).catch(err => {
            setErrorMovie(err.message);
        })
    }
    fetchAnswerFunction();
    fetchMovieFunction();
    fetchPersonFunction();
}, [page]);


  return (
    <div>
        {apiActorResponse.profile_path !== null && apiMovieResponse.poster_path !== null}
        { !errorActor && !errorMovie ? 
        <div>
          <img className="photo" src={`https://image.tmdb.org/t/p/original`+apiActorResponse.profile_path} alt={apiActorResponse.name}/>
          <img className="photo" src={`https://image.tmdb.org/t/p/original`+apiMovieResponse.poster_path} alt={apiMovieResponse.title}/> <br/>
          <button className='buttonYes' onClick={loadCommitYes}>Oui</button>
          <button className='buttonNo' onClick={loadCommitNo}>Non</button>
        </div> : 
        <div> 
          { !errorActor || !errorMovie ?
          <div>
            <p>could not fetch the data.</p>
          </div> : 
          errorActor && errorMovie && errorMovie } <br/>
          <button className='buttonRefresh' onClick={refreshCommit}>Refresh</button>
        </div> 
        }
    </div>
  );
}

export default Game