import React, { useState, useEffect } from 'react';
import { setInterval } from 'timers';
import './style/App.css';
import Comment from './router/comment'
import firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCdzAno8Bx5d0Jx-rGDkVBoYBNA_oGo2pU",
    authDomain: "coming-289c8.firebaseapp.com",
    projectId: "coming-289c8",
    storageBucket: "coming-289c8.appspot.com",
    messagingSenderId: "615575021232",
    appId: "1:615575021232:web:4e5a37bb7e0b0d0c65fd75",
    measurementId: "G-KH6T275EJ8"
};

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
    function setDay() {
        const ddayElement = document.getElementById("dday");
        const dday: number = new Date(2022, 0, 1).getTime();
        const today: number = new Date().getTime();
        const gap = dday - today;
        const day :number = Math.ceil(gap / (1000 * 60 * 60 * 24));
        const hour :number = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const min :number = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
        const sec :number = Math.ceil((gap % (1000 * 60)) / 1000);
        if (ddayElement !== null) {
            ddayElement.innerHTML = day + " : " + hour + " : " + min + " : " + sec
        }
    }

    setInterval(() => {
        setDay()
        console.log(123)
    }, 100)

    return (
        <div className="App">
            <h1 className="title">2022 is coming</h1>
            <div className="DDay">
                <h1 id="dday">--</h1>
            </div>
            <Comment/>
        </div>
    );
}

export default App;
