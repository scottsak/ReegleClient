import React from 'react';

// the board the has the guesses 
function GuessBoard(props) {
    return (
        <div className='guess-board'>
            <h3 id='guess-title'>GUESSES</h3>
            <div className='guess-list'>
            {/* lists the list of movies that have been guessed  */}
                {props.guessList.map((val, idx) =>
                    <div key={idx} className='guess-section'>
                        <h3 className='name-of-guess'>{val.toUpperCase()}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GuessBoard;