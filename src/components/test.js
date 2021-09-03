// import React, { useState, useEffect } from "react";
// import "./styles.css";
// import ButtonYes from './buttonComponent/ButtonYes';
// import ButtonNo from './buttonComponent/ButtonNo';
// import ButtonRefresh from './buttonComponent/ButtonRefresh';
// import '@fontsource/roboto';
// import ApiCall from '../Helper/CallApi'



// function Test() {

//   const [point, setPoint] = useState(1);
//   const [randomMovie, setRandomMovie] = useState(parseInt(Math.random()));
//   const IMAGE_KEY = process.env.REACT_APP_IMAGE;

 
//   function checkAnswerYes() {
//     if (apiAnswerResponse.id !== undefined && apiAnswerResponse.id !== randomMovie)
//       return 0;
//     else
//       return 1;
//   };

//   function checkAnswerNo() {
//     if (apiAnswerResponse.id !== undefined && apiAnswerResponse.id === randomMovie)
//       return 1;
//     else
//       return 0;
//   };

//   const loadCommitYes = () => {
//     setPage(spage + 1);
//     setPoint(point + checkAnswerYes());
//   };

//   const loadCommitNo = () => {
//     setPage(page + 1);
//     setPoint(point + checkAnswerNo());
//   };
  
//   const refreshCommit = () => {
//     setPage(page + 1);
//   };

//   return (
//     <div>
//         {apiActorResponse.profile_path !== null && apiMovieResponse.poster_path !== null}
//         { !errorActor && !errorMovie ? 
//           <div>
//             <img className="photo" src={IMAGE_KEY+apiActorResponse.profile_path} alt={apiActorResponse.name}/>
//             <img className="photo" src={IMAGE_KEY+apiMovieResponse.poster_path} alt={apiMovieResponse.title}/> <br/>
//             <div onClick={loadCommitYes}><ButtonYes></ButtonYes></div>
//             <div onClick={loadCommitNo}><ButtonNo></ButtonNo></div>

//           </div> : 
//           <div> 
//             { !errorActor || !errorMovie ?
//             <div>
//               <p>could not fetch the data.</p>
//             </div> : 
//             errorActor && errorMovie && errorMovie } <br/>
//             <div onClick={refreshCommit}><ButtonRefresh></ButtonRefresh></div>
//           </div> 
//         }
//     </div>
//   );
// }

// export default Test