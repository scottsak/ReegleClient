import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import closeButton from '../../images/x-symbol.svg';
import './Modal.css';

const StatScreen = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className='modal' onClick={props.onClose}>
        <div
          className='modal-content stat-modal-content'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='modal-header'>
            <h2 className='modal-title'>STATS</h2>
            <button onClick={props.onClose} className='button modal-button'>
              <img src={closeButton} alt='close button' width={15} />
            </button>
          </div>
          <div className='modal-body'>
            <h4>Games Played: {localStorage.getItem('gamesPlayed')}</h4>
            <h4>Wins: {localStorage.getItem('wins')}</h4>
            <h4>Losses: {localStorage.getItem('losses')}</h4>
            <h4>
              Win %:{' '}
              {isNaN(
                (parseInt(JSON.parse(localStorage.getItem('wins'))) /
                  parseInt(JSON.parse(localStorage.getItem('gamesPlayed')))) *
                  100
              )
                ? 'No Data'
                : (
                    (parseInt(JSON.parse(localStorage.getItem('wins'))) /
                      parseInt(
                        JSON.parse(localStorage.getItem('gamesPlayed'))
                      )) *
                    100
                  ).toFixed(2) + '%'}
            </h4>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root')
  );
};

export default StatScreen;
