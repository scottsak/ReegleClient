import React, { useState } from 'react';
import Axios from 'axios';




// importing jsx files
import GuessBoard from './GuessBoard';
import movies from '../movie.js'
import Autocomplete from './Autocomplete';
import Clock from './Clock'
import Ticket from './Ticket';
import Timer from './Timer';


function App() {

  // gets the date information for starting information 
  const today = new Date();
  const todaysDate = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
  const lastDayPlayed = localStorage.getItem('day');

  // checks last day played 
  if (lastDayPlayed !== todaysDate) {
    localStorage.setItem('day', todaysDate);
    localStorage.setItem('guesses', '[]');
    localStorage.setItem('guess', 1);
    localStorage.setItem('win', 'waiting');
  }

  // gets info for stats 
  let startGamesPlayed = JSON.parse(localStorage.getItem('gamesPlayed'));
  if (startGamesPlayed === null) {
    startGamesPlayed = 0;
    localStorage.setItem('gamesPlayed', 0);
  }
  const [gamesPlayed, setGamesPlayed] = useState(parseInt(startGamesPlayed))

  let startWin = localStorage.getItem('win');
  if (startWin === null) {
    startWin = 'waiting';
    localStorage.setItem('win', 'waiting');
  }

  const [win, setWin] = useState(startWin);

  let startGuessAmount = JSON.parse(localStorage.getItem('guess'));

  if (!startGuessAmount) {
    startGuessAmount = 1;
    localStorage.setItem('guess', 1)
  }

  let startLosses = JSON.parse(localStorage.getItem('losses'));
  if (!startLosses) {
    localStorage.setItem('losses', 0)
  }

  let startWins = JSON.parse(localStorage.getItem('wins'));
  if (!startWins) {
    localStorage.setItem('wins', 0)
  }

  const [guessesAmount, setGuesses] = useState(startGuessAmount);

  const [blurImage, setBlurImage] = useState(Math.abs(guessesAmount - 7) * 10);


  const [dailyMovieInfo, setDailyMovieInfo] = useState(movies[0])

  let startGuesses = JSON.parse(localStorage.getItem('guesses'));

  if (!startGuesses) {
    startGuesses = [];
    console.log(startGuesses)
    localStorage.setItem('guesses', JSON.stringify(startGuesses))
    console.log(JSON.parse(localStorage.getItem('guesses')));
  }
  const [guessList, setGuessList] = useState(startGuesses)


  // gets movie to start the game 
  function getInfoforMovie() {
    Axios.get("https://reegle-server.herokuapp.com/get_movie_info", {
    // Axios.get("http://localhost:3001/get_movie_info", {
      params: {
        todaysDate: (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
      }
    })
      .then((res) => {
        if (typeof res.data[0] !== 'undefined') {
          setDailyMovieInfo(res.data[0])
        }
      })
  }



  return (
    <div className="App">
      <Clock
        dailyMovieInfo={dailyMovieInfo}
        getInfoforMovie={getInfoforMovie}
        guessList={guessList}
        setGuessList={setGuessList}
        setWin={setWin}
        gamesPlayed={gamesPlayed}
        setGamesPlayed={setGamesPlayed}
      />
      <GuessBoard
        guessList={guessList}
        gamesPlayed = {gamesPlayed}
      />

      <div className='spacer'></div>


      {win === 'waiting' ?
        <Autocomplete
          suggestions={[
            "Sorcerer's Apprentice"
          ]}
          date={(today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()}
          guessesAmount={guessesAmount}
          setGuesses={setGuesses}
          setGuessList={setGuessList}
          guessList={guessList}
          setBlurImage={setBlurImage}
          blurImage={blurImage}
          win={win}
          setWin={setWin}
          setGamesPlayed={setGamesPlayed}
          gamesPlayed={gamesPlayed}
        />
        :
        <Timer
          win={win}
          dailyMovieInfo={dailyMovieInfo}
        />
      }

      <Ticket
        movies={dailyMovieInfo}
        guessesAmount={guessesAmount}
        setGuesses={setGuesses}
        blurImage={blurImage}
        setBlurImage={setBlurImage}
        win={win}
      />

      <div className='footer'></div>

    </div>
  );
}

export default App;
