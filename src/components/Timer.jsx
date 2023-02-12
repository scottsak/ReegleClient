import React, { useState, useEffect } from 'react';

function Timer(props) {

    // gets the time 
    const now = new Date().toLocaleTimeString();
    const today = new Date();


    let startM = now.split(':')[2].split(' ')[1];
    let startHour = startM === 'AM' ? addLeadingZeros(12 - now.split(':')[0], 2) : addLeadingZeros(12 - now.split(':')[0], 2);
    const [hour, setHoursLeft] = useState(startHour);
    const [min, setMinutesLeft] = useState(60 - now.split(':')[1]);
    const [seconds, setSecondsLeft] = useState(60 - now.split(':')[2].split(' ')[0]);
    const [copied, setCopied] = useState(false);

    function addLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0');
    }


    useEffect(() => {

        updateTime();
    });

    function updateTime() {
        let newNow = new Date().toLocaleTimeString();
        let newHour = newNow.split(':')[0];
        let newMinute = newNow.split(':')[1];
        let newSecond = newNow.split(':')[2].split(' ')[0];
        let newM = newNow.split(':')[2].split(' ')[1];
        if(newHour === '12'){
            if(newM === 'AM'){
                setHoursLeft(23);
            }
            else{
                setHoursLeft(11);
            }
        }
        else if(newM === 'AM'){
            setHoursLeft(12+(12-newHour));
        }
        else{
            setHoursLeft(12-newHour);
        }
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
        textShare += 'Reegle ' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() + ' ' + outOf + '/6\n\n'
        setCopied(true);
        setTimeout(function(){
            setCopied(false);
          }, 3000)


        for (let x = 0; x < endGuesses.length - 1; x++) {
            textShare += x + 1 + '. ';
            textShare += MakeAnonymous(endGuesses[x]);
            textShare += '\n';
        }

        let lastGuess = localStorage.getItem('win') === 'won' ? '🎟🎟🎟🎟🎟🎟' : MakeAnonymous(endGuesses[endGuesses.length - 1]);
        

        textShare += endGuesses.length + '. ' + lastGuess +  '\n';
        textShare += 'https://www.reegle.xyz/';
        navigator.clipboard.writeText(textShare);
        // // Check if navigator.share is supported by the browser
        // if (navigator.share) {
        //     console.log("Congrats! Your browser supports Web Share API");
        //     navigator
        //         .share({
        //             title: 'Reegle',
        //             url: `https://www.reegle.xyz/`,
        //             text: textShare+'\n\n',
        //         })
        //         .then(() => {
        //             console.log("Sharing successfull");
        //         })
        //         .catch(() => {
        //             console.log("Sharing failed");
        //         });
        // } else {
        //     console.log("Sorry! Your browser does not support Web Share API");
        // }
    };


    setInterval(updateTime, 1000);
    return (
        <div>
            {props.win === 'won' ? <h2>You Won!</h2> : <div><h2>You Lost</h2></div>}
            <p>Time until next game<br />{hour}:{min}:{seconds}</p>
            <button
                onClick={handleShareButton}
                className="share-button"
                type="button"
                title="Share this article"
            >
            {copied ? 'copied' : 'share'}
            </button>
        </div>
    )
}

export default Timer;