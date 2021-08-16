import React, { useState, useEffect } from "react";

function Game() {
  const [page, setPage] = useState(1);
  const [apiResponse, setApiResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY_MOVIE_DB = '7ea5f490261a949e52930517e1b4657c';

  const loadMoreCommit = () => {
    setPage(page + 1);
  };


  useEffect(() => {
    const myInit = {
        method: "GET",
        mode: "cors",
      };
      const random_0_20 = parseInt(Math.random() * (200 - 1) + 1);
      const actor = fetch(`https://api.themoviedb.org/3/person/${random_0_20}?api_key=${API_KEY_MOVIE_DB}`, myInit)
      .then(res => res.json())
      .then(response => {
        setApiResponse(JSON.stringify(response));
        setIsLoading(false);
        localStorage.setItem(`${random_0_20}`, JSON.stringify(response))
      })
      .catch(error => console.log(error));
    }, [page]);

  return (
    <div>
        {isLoading && <p>Loading</p>}
        {apiResponse.length !== 0 && (<button onClick={loadMoreCommit}>Load More Commits</button>)}
        {apiResponse}
        <img src=""></img>
    </div>
  );
}

export default Game