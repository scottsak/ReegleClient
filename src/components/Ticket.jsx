import React, { useState, useEffect, useRef } from 'react';
import ReactCardFlip from "react-card-flip";
import Pixelify from "./Pixelify";
import flip from '../images/flipButton.png'



function Ticket(props) {
    const src = "https://image.tmdb.org/t/p/w500/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg";
    const [flipped, setFlipped] = useState(true);


    useEffect(() => {

        if (props.guessesAmount >= 7 || props.win === 'won') {
            props.setBlurImage(0)
        }
    });

    const handleClick = () => {
        setFlipped(!flipped);
    }



    const MovieTitleShow = () => {
        if (props.guessesAmount >= 7 || props.win === 'won') {
            return (<h2>{props.movies.title}</h2>)
        }

        else {
            let t = "";

            for (let i = 0; i < props.movies.title.length; i++) {
                if (props.movies.title.charAt(i).match(/^[0-9a-zA-Z]+$/)) {
                    t += "_";
                }
                else {
                    t += props.movies.title.charAt(i);
                }
            }
            return <h2>HINTS</h2>
        }
    }

    // makes the hints anonymous 
    const MakeAnonymous = (item) => {
        let t = "";

        if (typeof (item) != 'string') {
            item = item.toString();
        }
        for (let i = 0; i < item.length; i++) {
            if (item.charAt(i).match(/^[0-9a-zA-Z]+$/)) {
                t += "x";
            }
            else {
                t += item.charAt(i);
            }
        }
        return t
    }

    const ticket = useRef(null);

    return (
        <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
            <div>
                <table ref={ticket} className="ticket">
                    <tbody>
                        <tr>
                            <td>
                                <div className="concave-corners__corner concave-corners__corner--tl"></div>


                                <div className="concave-corners__corner concave-corners__corner--tr"></div></td>
                        </tr>
                        <tr>
                            <td className="everythingelse">
                                <table className="table-ticket">
                                    <tbody>
                                        <tr className="hint1 hint">
                                            <td>{MovieTitleShow()}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="middle-hint-container"><h5 className="hint middle-hints">Rated: {props.movies.rated}</h5></div>
                                                <div className="middle-hint-container"><h5 className="hint middle-hints">IMDB: {props.movies.imdbRating}</h5></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {props.guessesAmount > 1 || props.win === 'won' ? <h4>Genres: {props.movies.genre}</h4> : <h4>Genres: {MakeAnonymous(props.movies.genre)}</h4>}
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>
                                                {props.guessesAmount > 2 || props.win === 'won' ? <h4>Release Date: {props.movies.releaseDate}</h4> : <h4>Release Date: {MakeAnonymous(props.movies.releaseDate)}</h4>}
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>
                                                <div className="middle-hint-container">{props.guessesAmount > 3 || props.win === 'won' ? <h5 className="hint middle-hints">Runtime: {props.movies.runtime}</h5> : <h5 className="hint middle-hints">Runtime: {MakeAnonymous(props.movies.runtime)}</h5>}</div>
                                                <div className="middle-hint-container">{props.guessesAmount > 3 || props.win === 'won' ? <h5 className="hint middle-hints">BoxOffice: {props.movies.boxOffice}</h5> : <h5 className="hint middle-hints">BoxOffice: {MakeAnonymous(props.movies.boxOffice)}</h5>}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {props.guessesAmount > 4 || props.win === 'won' ? <h5 className="hint">Director: {props.movies.director}</h5> : <h5>Director: {MakeAnonymous(props.movies.director)}</h5>}
                                            </td>
                                        </tr>
                                        <tr><td>
                                            {props.guessesAmount > 5 || props.win === 'won' ? <h5 className="hint">Actors: {props.movies.actors}</h5> : <h5>Actors: {MakeAnonymous(props.movies.actors)}</h5>}
                                        </td></tr>

                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="lastRowTicket"><td>
                                            <button className="flip-button" onClick={handleClick}><img className="flip-image" src={flip} alt="flip" /></button>
                                        </td></tr>
                        <tr>
                            <td>

                                <div className="concave-corners__corner concave-corners__corner--bl"></div>


                                <div className="concave-corners__corner concave-corners__corner--br"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table className="ticket">
                    <tbody>
                        <tr>
                            <td>
                                <div className="concave-corners__corner concave-corners__corner--tl"></div>


                                <div className="concave-corners__corner concave-corners__corner--tr"></div></td>
                        </tr>
                        <tr>
                            <td className="everythingelse">
                                <table className="table-ticket">
                                    <tbody>
                                        <tr className="hint1 hint">
                                            <td>
                                                <div>
                                                    <Pixelify
                                                        src={props.movies.imageLink}
                                                        pixelSize={props.blurImage}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="lastRowTicket">
                                            <td>
                                                <button className="flip-button" onClick={handleClick}><img className="flip-image" src={flip} alt="flip" /></button>
                                            </td></tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>

                                <div className="concave-corners__corner concave-corners__corner--bl"></div>


                                <div className="concave-corners__corner concave-corners__corner--br"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ReactCardFlip>
    )
}

export default Ticket;