import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import './Modal.css'

const InfoScreen = props => {
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };


  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">INFO</h2>
            <button onClick={props.onClose} className="button modal-button">
              x
            </button>
          </div>
          <div className="modal-body">
            <h4>Note:</h4>
            <p>This app is a work in progress, there are still bugs to be squashed so know they are being worked on. <br></br>
            Please contact me <a href = "mailto: scottsakuraigames@gmail.com"> @scottsakuraigames </a>if you have any notes or ideas to help this app become great! </p>
            <p className="copyright">Used TMDB and OMDB for movie content</p>
            <a href="https://www.themoviedb.org/?language=en-US"><img width='100px' src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg' alt="the movie database"></img></a>
          </div>
          <div className="modal-footer">
            <p className="owner">Created and developed by Scott Sakurai</p>
            <p className="owner"></p>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default InfoScreen;
