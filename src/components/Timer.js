import React, { useState, useEffect } from 'react';
import GameOver from './GameOver.js';
import Button from '@material-ui/core/Button';
import Game from './Game.js';
import '@fontsource/roboto';


const Timer = () => {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(60);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 60) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  if (seconds > 0) {
  return (
    <div className="app">
      <div className="time">
        {seconds}s
      </div>
      <div className="row">
        <Button variant="contained" color="primary" className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </Button>
        {isActive ? <Game/> : ''}
      </div>
    </div>
  );
  }
  else return (
    <div>
      <GameOver/>
    </div>
  );
};

export default Timer;