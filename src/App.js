import React, { useState, useEffect } from 'react';
import './App.css';

let cheese_urls = []

function App(){
  const defaultBigNumber = '17000000000000';
  const defaultSmallNumber = '1000000000000';
  const [viewType, setViewType] = useState('none');
  const [numbers, setNumbers] = useState({
    bigNumbers: defaultBigNumber,
    smallNumbers: defaultSmallNumber,
  });

  useEffect(()=>{
    switch (viewType) {
      case 'title':
        titleClock();
        break;
      case 'numberFirst':
        numbersFirstClock();
        break;
      case 'number':
        numbersClock();
        break;
      case 'cheese':
        cheeseClock();
        break;
    }
  },[viewType])

  useEffect(()=>{
    fetch('https://serpapi.com/search.json?q=cheese&tbm=isch&ijn=0&api_key=fe9cc3f3d7a0746fb430551bdeb5bcb202a138154ad2a5b25b0b94e8beadf49d',
    )
    .then(result => result.json())
    .then(data => data.images_results.map(item => cheese_urls.push(item.thumbnail)));

  },[])

  const getChangedNumbers = () => {
    const checkIfSmallNumberEqualsZero = parseInt(numbers.smallNumbers) === 0
    let changedBigNumbers;

    if (numbers.bigNumbers === defaultBigNumber)
      changedBigNumbers = parseInt(numbers.bigNumbers)-1
    else
      changedBigNumbers = checkIfSmallNumberEqualsZero ? parseInt(numbers.bigNumbers)-1 : numbers.bigNumbers

    return {
      bigNumbers: changedBigNumbers,
      smallNumbers: checkIfSmallNumberEqualsZero ? defaultSmallNumber : (parseInt(numbers.smallNumbers)-1).toString(),
    };
  }
  const startCinematicMovie = () => {
    setViewType('title');
    var audio = document.getElementById("muza");
    audio.volume = 0.2;
    audio.play();

  }
  const titleClock = () => {
    setTimeout(() => setViewType('numberFirst'),3000)
  }
  const numbersClock = () => {
    setNumbers(getChangedNumbers());
    setTimeout(() => setViewType('cheese'),3000)
  }

  const numbersFirstClock = () => {
    setTimeout(() => setViewType('cheese'),3000)
  }

  const cheeseClock = () => {
    setNumbers({
      bigNumbers: numbers.bigNumbers,
      smallNumbers: numbers.smallNumbers,
    });
    
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = cheese_urls[0];



    setTimeout(() => {
      cheese_urls.shift()
      setViewType('number')
    },3000)

  }

  const insertSeparator = (value) => {
    return value.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ',')
  }

  switch (viewType) {
    case 'title':
      return <div id="page">
        <div className="main" id="main">my favorite top {insertSeparator(numbers.bigNumbers)},{insertSeparator(numbers.smallNumbers.toString().substring(1))} cheese</div>
      </div>
    case 'numberFirst':
    case 'number':
      return <div id="page">
        <div className="main" id="main">{`${insertSeparator(numbers.bigNumbers)},${
          numbers.smallNumbers === defaultSmallNumber ? insertSeparator(numbers.smallNumbers.toString().substring(1)): insertSeparator(numbers.smallNumbers)
          }`} </div>
      </div>
    case 'cheese':
      return <div className="cheese"><img src={cheese_urls[0]}/></div>
    case 'none':
      return <div className="center-this-pls"><button id="start_button" onClick={() => startCinematicMovie()}>start</button></div>
  }
}

export default App;
