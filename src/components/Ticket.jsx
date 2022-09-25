import React, { useState, useEffect, useRef } from 'react';
import ReactCardFlip from "react-card-flip";
import Pixelify from "./Pixelify";
import flip from '../images/flipButton.png'



function Ticket(props) {
    const src = "https://image.tmdb.org/t/p/w500/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg";
    const [flipped, setFlipped] = useState(true);
    const { innerWidth, innerHeight } = window;



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
            return (<h2 className='hint-title-section'>{props.movies.title}</h2>)
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
            return <h2 className='hint-title-section'>{t}</h2>
        }
        else {
            return <h2 className='hint-title-section'>HINTS</h2>
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
            <div className='movie-title-section'><div className='hint-lines' /><div className='hint-line-divider' />{MovieTitleShow()}<div className='hint-line-divider' /><div className='hint-lines' /></div>
            <Pixelify
                src={props.movies.imageLink}
                pixelSize={props.blurImage}
                width={700}
                height={393}
            />
            <div className="table-ticket">
                <div className="clue-list"><h4>Genres: {props.movies.genre}</h4></div>
                <div className="clue-list">{props.guessesAmount > 1 || props.win === 'won' ? <h4>Release Date: {props.movies.releaseDate}</h4> : <h4 className='anon-hint'>Release Date: {MakeAnonymous(props.movies.releaseDate)}</h4>}</div>
                <div className="clue-list">{props.guessesAmount > 2 || props.win === 'won' ? <div className="middle-hint-container"><h4 className="hint middle-hints">Rated: {props.movies.rated}</h4></div> : <div className="middle-hint-container"><h4 className="hint middle-hints anon-hint">Rated: {MakeAnonymous(props.movies.rated)}</h4></div>}
                {props.guessesAmount > 2 || props.win === 'won' ? <div className="middle-hint-container"><h4 className="hint middle-hints">IMDB: {props.movies.imdbRating}</h4></div> : <div className="middle-hint-container"><h4 className="hint middle-hints anon-hint">IMDB: {MakeAnonymous(props.movies.imdbRating)}</h4></div>}</div>
                <div className="clue-list">{props.guessesAmount > 3 || props.win === 'won' ? <h4 className="hint">Director: {props.movies.director}</h4> : <h4 className='anon-hint'>Director: {MakeAnonymous(props.movies.director)}</h4>}</div>
                <div className="clue-list">{props.guessesAmount > 4 || props.win === 'won' ? <h4 className="hint">Actors: {props.movies.actors}</h4> : <h4 className='anon-hint'>Actors: {MakeAnonymous(props.movies.actors)}</h4>}</div>
            </div>
        </div>

    )
}

export default Ticket;