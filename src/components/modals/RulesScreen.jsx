import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import closeButton from '../../images/x-symbol.svg';
// import closeButton from 'images/x-symbol.svg';
import './Modal.css';

const RulesScreen = (props) => {
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
        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
          <div className='modal-header'>
            <h2 className='modal-title'>RULES</h2>
            <button onClick={props.onClose} className='button modal-button'>
              <img src={closeButton} alt='close button' width={15} />
            </button>
          </div>
          <div className='modal-body'>
            <p>
              1. Look at the hints provided and try and piece together what
              movie could fit all of these clues <br />
              <br />
              2. Use the search bar to guess a movie <br />
              <br />
              3. You have 6 tries to guess the movie
              <br />
              <br />
              4. With each guess you will get a new hint and the image will be
              more clear
              <br />
              <br />
              5. Have fun!
            </p>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root')
  );
};

export default RulesScreen;
