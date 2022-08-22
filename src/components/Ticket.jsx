import React, { useState, useEffect, useRef } from 'react';
import ReactCardFlip from "react-card-flip";
import Pixelify from "./Pixelify";
import flip from '../images/flipButton.png'
import TicketTable from './TicketTable';



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

        else if (props.guessesAmount > 5) {
            let t = "";

            for (let i = 0; i < props.movies.title.length; i++) {
                if (props.movies.title.charAt(i).match(/^[0-9a-zA-Z]+$/)) {
                    t += "X";
                }
                else {
                    t += props.movies.title.charAt(i);
                }
            }
            return <h2>{t}</h2>
        }
        else {
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
        <div>
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
                                
                                    <TicketTable 
                                        movies = {props.movies}
                                        MovieTitleShow = {MovieTitleShow}
                                        MakeAnonymous = {MakeAnonymous}
                                        win = {props.win}
                                        guessesAmount = {props.guessesAmount}
                                    />
                                
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
                                                            width={600}
                                                            height={337}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
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
            <div className="lastRowTicket">
                <button className="flip-button" onClick={handleClick}><img className="flip-image" src={flip} alt="flip" /></button>
            </div>
        </div>

    )
}

export default Ticket;