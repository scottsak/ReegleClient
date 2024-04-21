import React, { useState } from 'react';
import stats from '../images/stats.png';
import q from '../images/question-mark.png';
import info from '../images/info.png';
import scott from '../images/scott-black-thick.png';

// modals
import InfoScreen from './modals/InfoScreen';
import StatScreen from './modals/StatScreen';
import RulesScreen from './modals/RulesScreen';
import Scott from './modals/Scott';
// the board the has the guesses
function GuessBoard(props) {
  // modals
  const [showInfo, setShowInfo] = useState(false);
  const [showStat, setShowStat] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showScott, setShowScott] = useState(false);

  return (
    <>
      <div className='guess-board maintenanceMode'>
        <div className='header'>
          <h1 className='game-title'>REEGLE</h1>
          <div className='top right'>
            <div className='right-top-div'>
              <button
                className='top-button rules-button'
                onClick={() => setShowRules(true)}
              >
                <img className='top-button-image' src={q}></img>
              </button>
              <RulesScreen
                title='My Modal'
                onClose={() => setShowRules(false)}
                show={showRules}
              ></RulesScreen>
              <div className='btn-space'></div>
              <button
                className='top-button stats-button'
                onClick={() => setShowStat(true)}
              >
                <img className='top-button-image' src={stats}></img>
              </button>
              <StatScreen
                title='My Modal'
                onClose={() => setShowStat(false)}
                show={showStat}
                gamesPlayed={props.gamesPlayed}
              ></StatScreen>
              <div className='btn-space'></div>
              <button
                className='top-button scott-button'
                onClick={() => setShowScott(true)}
              >
                <img
                  className='top-button-image scott-logo'
                  src={scott}
                  alt='scott website logo'
                />
              </button>
              <Scott
                title='My Modal'
                onClose={() => setShowScott(false)}
                show={showScott}
              ></Scott>
              <div className='btn-space'></div>
              <button
                className='top-button info-button'
                onClick={() => setShowInfo(true)}
              >
                <img className='top-button-image' src={info}></img>
              </button>
              <InfoScreen
                title='My Modal'
                onClose={() => setShowInfo(false)}
                show={showInfo}
              ></InfoScreen>
            </div>
          </div>
        </div>
      </div>
      <div className='guess-board maintenanceMode'>
        <img src={require('../images/tooCheap.png')} alt='i am broke' />
        <h1>Sorry I am too broke to host the database and server</h1>
      </div>
    </>
  );
}

export default GuessBoard;
