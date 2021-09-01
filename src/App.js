import React from 'react';
import Start from './components/Start.js';
import Timer from './components/Timer.js';
import '@fontsource/roboto';


const App = () => {
  require('dotenv').config()
  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <Start/>
      <Timer/>
    </div>
  );
};
export default App;