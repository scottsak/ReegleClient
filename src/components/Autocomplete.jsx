import { useState } from "react";
import Axios from 'axios';
// import guesses from "../guesses";

const AutoComplete = ({ suggestions, date, setGuesses, guessesAmount, setGuessList, guessList, setBlurImage, blurImage, win, setWin, setGamesPlayed, gamesPlayed}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const getSuggestions = (userInput) => {
    return new Promise(function (resolve, reject) {
      Axios.get("https://reegle-server.herokuapp.com/search_movie", {
        // Axios.get("http://localhost:3001/search_movie", {
        params: {
          input: userInput
        }
      })
        .then((res) => {
          setFilteredSuggestions(res.data)
          resolve (res.data);
        })
        .catch((err) => {
          console.log("err with num")
        })
        
    })
  }
  
  const getImageBlur = () => {
    if(guessesAmount >= 7 || win==='win'){
      setBlurImage(0)
    }
    else{
      setBlurImage(Math.abs(guessesAmount-7)*8)
    }
    
  }

    // adds to the amount of guesses for the day 
    function guessUp() {
      localStorage.setItem('guess', guessesAmount + 1);
      setGuesses(guessesAmount + 1)
    }

  const compareAns = (guess, text) => {
    Axios.get("https://reegle-server.herokuapp.com/get_movie_info", {
      // Axios.get("http://localhost:3001/get_movie_info", {
      params: {
        todaysDate: date
      }
    })
    .then((res)=> {
      if(typeof res.data[0] !== 'undefined'){
        setGuessList(guessList => [...guessList, guess]);
        guessUp();
        if(res.data[0].id.toString() === text.toString()){
          localStorage.setItem('win', 'won');
          setWin('won');
          let tempWins = JSON.parse(localStorage.getItem('wins'));
          if(!tempWins){
            tempWins = 0;
          }
          localStorage.setItem('wins',  parseInt(tempWins)+1)
          localStorage.setItem('gamesPlayed', parseInt(JSON.parse(localStorage.getItem('gamesPlayed')))+1);
          setGamesPlayed(gamesPlayed+1)
        }
        else{
          if(guessesAmount >= 6){
            localStorage.setItem('win', 'lost');
            setWin('lost')
            let tempLosses = JSON.parse(localStorage.getItem('losses'));
            if(!tempLosses){
              tempLosses = 0;
            }
            localStorage.setItem('losses',  parseInt(tempLosses)+1)
            localStorage.setItem('gamesPlayed', parseInt(JSON.parse(localStorage.getItem('gamesPlayed')))+1);
            setGamesPlayed(gamesPlayed+1)
          }
          getImageBlur();
        }
      }
      
    })
  }

  const onChange = (e) => {
    // Filter our suggestions that don't contain the user's input
    setInput(e.target.value);
    getSuggestions(e.target.value)
    setShowSuggestions(true);
  };

  const onClick = (e, key) => {
    setFilteredSuggestions([]);
    setInput("");
    setShowSuggestions(false);
    compareAns(e.target.innerText, key.substring(key.lastIndexOf(',')+1));
  };


  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;

          return (
            <li className={className} key={suggestion} onClick={event => onClick(event, suggestion)}>
              {suggestion.substring(0,suggestion.lastIndexOf(','))}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>sorry no suggestions</em>
      </div>
    );
  };

  return (
    <>
      {win === 'won' || win === 'lost' ? <div className="lossSpace"></div> : <input 
        placeholder={"Guess "+guessesAmount+" of 6"}
        type="text"
        onChange={onChange}
        // onKeyDown={onKeyDown}
        value={input}
      />}
      
      <div className="autocompleteWrapper">
      <div className="suggestionsWrapper">
      {showSuggestions && input && <SuggestionsListComponent />}
      </div>
      </div>
    </>
  );
};

export default AutoComplete;




