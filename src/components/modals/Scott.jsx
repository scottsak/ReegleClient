import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const StatScreen = (props) => {
  const closeOnEscapeKeyDown = (e) => {
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
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">ABOUT ME</h2>
            <button onClick={props.onClose} className="button modal-button">
              x
            </button>
          </div>
          <div className="modal-body">
            <h3>Come Visit My Personal Website</h3>
            <h4>
              <a className="links" href="https://scottsakurai.com/">
                scottsakurai.com
              </a>
            </h4>
            <p>
              I am a freelance programmer making fun projects to keep growing.
              If you are a hiring manager please visit my website or email me!
            </p>
          </div>
          <div className="modal-footer">
            <p className="owner">
              email me at{" "}
              <a className="links" href="mailto:scott.t.sakurai@gmail.com">
                scott.t.sakurai@gmail.com
              </a>
            </p>
            <p className="owner"></p>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default StatScreen;
