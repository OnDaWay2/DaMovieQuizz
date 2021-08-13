import React, { Component } from 'react'
import Timer from './components/Timer.js';
import './App.css';

class App extends Component {
  render() {
  return (
    <div>
      <Timer startCount={5}/>
    </div>
  );
  }
}

export default App;
