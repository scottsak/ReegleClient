import React, { useState, useEffect } from 'react';
import movies from '../movie';
import Axios from 'axios';

function Timer(props) {

    // gets the time 
    const now = new Date().toLocaleTimeString();
    const today = new Date();
    const todaysDate = (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear();

    const [hour, setHoursLeft] = useState(24 - now.split(':')[0]);
    const [min, setMinutesLeft] = useState(60 - now.split(':')[1]);
    const [seconds, setSecondsLeft] = useState(60 - now.split(':')[2].split(' ')[0]);

    function addLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0');
      }


    useEffect(() => {
        
        updateTime();
    });

    function updateTime() {
        let newHour = new Date().toLocaleTimeString().split(':')[0];
        let newMinute = new Date().toLocaleTimeString().split(':')[1];
        let newSecond = new Date().toLocaleTimeString().split(':')[2].split(' ')[0];
        setHoursLeft(addLeadingZeros( 24-newHour, 2) );
        setMinutesLeft(addLeadingZeros(60 - newMinute, 2));
        setSecondsLeft(addLeadingZeros(60 - newSecond, 2));
    }


    setInterval(updateTime, 1000);
    return (
        <div>
        {props.win === 'wn' ? <h2>You Won!</h2> : <div><h2>You Lost <br /></h2> <h4>The movie was: <br />{props.dailyMovieInfo.title}</h4></div>}
        {/* <p className = 'afterGameScreen'>Time Until Next Game:</p> */}
        <p>Time until next game<br />{hour}:{min}:{seconds}</p>
        </div>
    )
}

export default Timer;