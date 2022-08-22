import React from 'react';

function TicketTable(props) {
    return (
        <td className="everythingelse">
            <table className="table-ticket">
                <tbody>
                    <tr className="hint1 hint">
                        <td>{props.MovieTitleShow()}</td>
                    </tr>

                    <tr>
                        <td>
                            <h4>Genres: {props.movies.genre}</h4>
                        </td>
                    </tr>
                    <tr >
                        <td>
                            {props.guessesAmount > 1 || props.win === 'won' ? <h4>Release Date: {props.movies.releaseDate}</h4> : <h4>Release Date: {props.MakeAnonymous(props.movies.releaseDate)}</h4>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {props.guessesAmount > 2 || props.win === 'won' ? <div className="middle-hint-container"><h5 className="hint middle-hints">Rated: {props.movies.rated}</h5></div> : <div className="middle-hint-container"><h5 className="hint middle-hints">Rated: {props.MakeAnonymous(props.movies.rated)}</h5></div>}
                            {props.guessesAmount > 2 || props.win === 'won' ? <div className="middle-hint-container"><h5 className="hint middle-hints">IMDB: {props.movies.imdbRating}</h5></div> : <div className="middle-hint-container"><h5 className="hint middle-hints">IMDB: {props.MakeAnonymous(props.movies.imdbRating)}</h5></div>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {props.guessesAmount > 3 || props.win === 'won' ? <h5 className="hint">Director: {props.movies.director}</h5> : <h5>Director: {props.MakeAnonymous(props.movies.director)}</h5>}
                        </td>
                    </tr>
                    <tr><td>
                        {props.guessesAmount > 4 || props.win === 'won' ? <h5 className="hint">Actors: {props.movies.actors}</h5> : <h5>Actors: {props.MakeAnonymous(props.movies.actors)}</h5>}
                    </td></tr>

                </tbody>
            </table>
        </td>
    )
}

export default TicketTable;