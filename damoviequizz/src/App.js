import React, { useState } from 'react';
import Start from './components/Start.js';
import Timer from './components/Timer.js';
import "./App.css";

const App = () => {
  return (
    <div>
      <Start/>
      <Timer/>
    </div>
  );
};
export default App;