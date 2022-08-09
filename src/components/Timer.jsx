import React, { useState, useEffect } from 'react';
import movies from '../movie';
import Axios from 'axios';

function Timer(props) {

    // gets the time 
    const now = new Date().toLocaleTimeString();
    const today = new Date();
    const todaysDate = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
    // console.log(now); //12:41:54 AM


    let startM = now.split(':')[2].split(' ')[1];
    let startHour = startM === 'AM' ? addLeadingZeros(12 - now.split(':')[0], 2) : addLeadingZeros(12 - now.split(':')[0], 2);
    const [hour, setHoursLeft] = useState(startHour);
    const [min, setMinutesLeft] = useState(60 - now.split(':')[1]);
    const [seconds, setSecondsLeft] = useState(60 - now.split(':')[2].split(' ')[0]);

    function addLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0');
    }


    useEffect(() => {

        updateTime();
    });

    function updateTime() {
        let newNow = new Date().toLocaleTimeString()

        let newMinute = newNow.split(':')[1];
        let newSecond = newNow.split(':')[2].split(' ')[0];
        let newM = newNow.split(':')[2].split(' ')[1];
        let newHour = newM === 'AM' ? addLeadingZeros(35 - newNow.split(':')[0], 2) : addLeadingZeros(24 - newNow.split(':')[0], 2);
        // if (newM === 'AM') { setHoursLeft(addLeadingZeros(12 - newHour, 2)); } else { setHoursLeft(addLeadingZeros(12 - newHour, 2)); }

        setHoursLeft(newHour);
        setMinutesLeft(addLeadingZeros(60 - newMinute, 2));
        setSecondsLeft(addLeadingZeros(60 - newSecond, 2));
    }

    function MakeAnonymous(item) {
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

    const handleShareButton = () => {
        let endGuesses = JSON.parse(localStorage.getItem('guesses'));
        let textShare = '';
        let outOf = localStorage.getItem('win') === 'won' ? endGuesses.length : 'X';
        textShare += 'Reegle ' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() + ' ' + outOf + '/6\n'

        for (let x = 0; x < endGuesses.length - 1; x++) {
            textShare += x + 1 + ' ';
            textShare += MakeAnonymous(endGuesses[x]);
            textShare += '\n';
        }

        let lastGuess = localStorage.getItem('win') === 'won' ? '🎟🎟🎟🎟🎟🎟' : MakeAnonymous(endGuesses[endGuesses.length - 1]);

        textShare += endGuesses.length + ' ' + lastGuess
        navigator.clipboard.writeText(textShare);
        // Check if navigator.share is supported by the browser
        if (navigator.share) {
            console.log("Congrats! Your browser supports Web Share API");
            navigator
                .share({
                    url: `https://reegle.netlify.app/`
                })
                .then(() => {
                    console.log("Sharing successfull");
                })
                .catch(() => {
                    console.log("Sharing failed");
                });
        } else {
            console.log("Sorry! Your browser does not support Web Share API");
        }
    };

    function shareBtn() {
        let endGuesses = JSON.parse(localStorage.getItem('guesses'));
        let textShare = '';
        let outOf = localStorage.getItem('win') === 'won' ? endGuesses.length : 'X';
        textShare += 'Reegle ' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() + ' ' + outOf + '/6\n'

        for (let x = 0; x < endGuesses.length - 1; x++) {
            textShare += x + 1 + ' ';
            textShare += MakeAnonymous(endGuesses[x]);
            textShare += '\n';
        }

        let lastGuess = localStorage.getItem('win') === 'won' ? '🎟🎟🎟🎟🎟🎟' : MakeAnonymous(endGuesses[endGuesses.length - 1]);

        textShare += endGuesses.length + ' ' + lastGuess
        navigator.clipboard.writeText(textShare);
        navigator.share({
            title: document.title,
            text: textShare,
            url: window.location.href
        })
            .then(() => console.log('Successful share! 🎉'))
            .catch(err => console.error(err));
    }


    setInterval(updateTime, 1000);
    return (
        <div>
            {props.win === 'won' ? <h2>You Won!</h2> : <div><h2>You Lost <br /></h2> <h4>The movie was: <br />{props.dailyMovieInfo.title}</h4></div>}
            {/* <p className = 'afterGameScreen'>Time Until Next Game:</p> */}
            <p>Time until next game<br />{hour}:{min}:{seconds}</p>
            <button
                onClick={handleShareButton}
                className="share-button"
                type="button"
                title="Share this article"
            >
            Share
            </button>
        </div>
    )
}

export default Timer;