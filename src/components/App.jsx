import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// importing jsx files
import GuessBoard from './GuessBoard';
import movies from '../movie.js'
import Autocomplete from './Autocomplete';
import Clock from './Clock'
import Ticket from './Ticket';
import Timer from './Timer';

// modals
import InfoScreen from './modals/InfoScreen';
import StatScreen from './modals/StatScreen';
import RulesScreen from './modals/RulesScreen';
import Scott from './modals/Scott';

// icons for top buttons
import stats from '../images/stats.png';
import q from '../images/question-mark.png';
import info from '../images/info.png';
import scott from '../images/scott-black-thick.png';



function App() {


  // modals
  const [showInfo, setShowInfo] = useState(false);
  const [showStat, setShowStat] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showScott, setShowScott] = useState(false);

  // gets the date information for starting information 
  const today = new Date();
  const todaysDate = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
  const lastDayPlayed = localStorage.getItem('day');

  // checks last day played 
  if (lastDayPlayed !== todaysDate) {
    localStorage.setItem('day', todaysDate);
    localStorage.setItem('guesses', '[]');
    localStorage.setItem('guess', 1);
    localStorage.setItem('win','waiting');
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

  const [blurImage, setBlurImage] = useState(Math.abs(guessesAmount - 7) * 15);

  const [dailyMovieInfo, setDailyMovieInfo] = useState(movies[0])

  let startGuesses = JSON.parse(localStorage.getItem('guesses'));

  if (!startGuesses) {
    console.log("yellow")
    startGuesses = [];
    console.log(startGuesses)
    localStorage.setItem('guesses', JSON.stringify(startGuesses))
    console.log(JSON.parse(localStorage.getItem('guesses')));
  }
  const [guessList, setGuessList] = useState(startGuesses)


  // gets movie to start the game 
  function getInfoforMovie() {
    Axios.get("https://reegle-server.herokuapp.com/get_movie_info", {
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

  // adds to the amount of guesses for the day 
  function guessUp() {
    localStorage.setItem('guess', guessesAmount + 1);
    setGuesses(guessesAmount + 1)
  }

  return (
    <div className="App">
      <div className='header'>
        <div className='top left'>
          <div className='game-title'>
            <h1>reegle</h1>
          </div>
        </div>
      </div>
      <div className='top right'>
        {/* header buttons left side */}
        <div className='right-top-div'>
          <button className='top-button rules-button' onClick={() => setShowRules(true)}><img className='top-button-image' src={q}></img></button>
          <RulesScreen title="My Modal" onClose={() => setShowRules(false)} show={showRules}></RulesScreen>
          <div className='btn-space'></div>
          <button className='top-button stats-button' onClick={() => setShowStat(true)}><img className='top-button-image' src={stats}></img></button>
          <StatScreen title="My Modal" onClose={() => setShowStat(false)} show={showStat} gamesPlayed={gamesPlayed}></StatScreen>
        </div>

        <div className='middle-btn-space btn-space'></div>

        {/* header buttons right side */}
        <div className='right-top-div'>
          <button className='top-button scott-button' onClick={() => setShowScott(true)}><img className='top-button-image scott-logo' src={scott} alt="scott website logo" /></button>
          <Scott title="My Modal" onClose={() => setShowScott(false)} show={showScott}></Scott>
          <div className='btn-space'></div>
          <button className='top-button info-button' onClick={() => setShowInfo(true)}><img className='top-button-image' src={info}></img></button>
          <InfoScreen title="My Modal" onClose={() => setShowInfo(false)} show={showInfo}></InfoScreen>
        </div>
      </div>

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
      />

      <div className='spacer'></div>


      {win === 'waiting'? 
      <Autocomplete
        suggestions={[
          "Angular",
          "Blitzjs",
          "Gatsby",
          "Reactjs",
          "Vuejs",
          "Svelte",
          "Nextjs",
          "Node",
          "Express",
          "Sails",
          "Loopback",
          "React-router",
          "Redux",
          "Flux",
          "Yarn",
          "Npm"
        ]}
        date={(today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()}
        guessUp={guessUp}
        guessesAmount={guessesAmount}
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
        win = {win}
        dailyMovieInfo = {dailyMovieInfo}
      />
      }

      <div className='spacer'></div>

      <Ticket
        movies={dailyMovieInfo}
        guessesAmount={guessesAmount}
        setGuesses = {setGuesses}
        blurImage={blurImage}
        setBlurImage={setBlurImage}
        win={win}
      />

      <div className='footer'></div>

    </div>
  );
}

export default App;
