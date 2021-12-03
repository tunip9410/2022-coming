import React, { useState, useEffect } from 'react';
import { setInterval } from 'timers';
import './App.css';


function App() {
    const [ddayValue, setDdayValue] = useState<string>("--")
    const dday: number = new Date(2022, 0, 1).getTime();
    const today: number = new Date().getTime();
    const gap = dday - today;
    const day :number = Math.ceil(gap / (1000 * 60 * 60 * 24));
    const hour :number = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const min :number = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
    const sec :number = Math.ceil((gap % (1000 * 60)) / 1000);

    const ddayElement = document.getElementById("dday");
    
    useEffect(() => {
        setInterval(() => {
            if (ddayElement instanceof Element) {
                ddayElement.innerHTML = day + ":" + hour + ":" + min + ":" + sec
            }
        }, 1000)
    }, [])

    console.log(dday, today, gap, hour, min, sec);
    return (
        <div className="App">
            <h1 className="title">2022 is coming</h1>
            <div className="DDay">
                <h1 id="dday"></h1>
                
            </div>
        </div>
    );
}

export default App;
