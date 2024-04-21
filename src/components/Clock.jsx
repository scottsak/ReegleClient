import React, { useState, useEffect } from 'react';
import movies from '../movie';

function Clock(props) {
  // gets the time
  const now = new Date().toLocaleTimeString();
  const today = new Date();
  const todaysDate =
    today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();

  const [time, setTime] = useState(now);

  useEffect(() => {
    updateTime();

    if (localStorage.getItem('win') === 'won') {
      props.setWin('won');
    }
    if (localStorage.getItem('win') === 'lost') {
      props.setWin('lost');
    }

    if (time === '12:00:01 AM') {
      localStorage.setItem('day', todaysDate);
      localStorage.setItem('guesses', '[]');
      localStorage.setItem('guess', 1);
      localStorage.setItem('win', 'waiting');
      localStorage.setItem('gamesPlayed', props.gamesPlayed + 1);
      props.setGamesPlayed(parseInt(props.gamesPlayed) + 1);
      props.setGuessList([]);
      props.setWin('waiting');
    }

    if (
      JSON.stringify(props.dailyMovieInfo) === JSON.stringify(movies[0]) &&
      typeof sqldb === 'undefined'
    ) {
      props.getInfoforMovie();
    }
    if (props.guessList && JSON.parse(localStorage.getItem('guesses'))) {
      if (
        props.guessList.length !==
        JSON.parse(localStorage.getItem('guesses')).length
      ) {
        localStorage.setItem('guesses', JSON.stringify(props.guessList));
      }
    }
  });

  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }

  setInterval(updateTime, 1000);
  return <div></div>;
}

export default Clock;
