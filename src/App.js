// import logo from './logo.svg';
// import React from 'react';

// import {useState} from './react';
import './App.css';
import React, { useEffect } from 'react'
import { useState } from 'react';
import SingleCard from './Components/SingleCard';
// import './style.css';

const Cards = [
  { "src": "images/sword-1.png", match: false },
  { "src": "images/helmet-1.png", match: false },
  { "src": "images/potion-1.png", match: false },
  { "src": "images/scroll-1.png", match: false },
  { "src": "images/ring-1.png", match: false },
  { "src": "images/shield-1.png", match: false }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setchoiceOne] = useState(null)
  const [choiceTwo, setchoiceTwo] = useState(null)
  const [disabledState, setdisabledState] = useState(false)


  //duplicate - shuffle
  const shuffleCards = () => {
    const shuffledCards = [...Cards, ...Cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setchoiceOne(null)
    setchoiceTwo(null)
    setTurns(0)
  }

  const choiceMaker = (card) => {
    // console.log(card)
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card)

  }

  useEffect(() => {
  //  set disabled cannot be used herer because it implements on trt also
    if (choiceOne && choiceTwo) {
      setdisabledState(true)
      if (choiceOne.src === choiceTwo.src) {
        // console.log("Successfull Match")
        // console.log(turns)
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, match: true }
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else {
        // console.log("Unsuccesfull Match")
        // console.log(turns)
        setTimeout(() =>resetTurn(),400)
      }
    }
   

  }, [choiceOne, choiceTwo])

  useEffect(() =>{
    shuffleCards()
  },[])

  // console.log(cards)


  const resetTurn = () => {
    setchoiceOne(null)
    setchoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setdisabledState(false)
  }



  return (
    <div className="App">
      <h1 >Fippperz</h1>
      <button onClick={shuffleCards} >New Game</button>

      <div className="cards-grid">
        {
          cards.map((card) => (
            <SingleCard card={card} choiceMaker={choiceMaker} flippedState={card===choiceOne || card===choiceTwo || card.match===true} disabledState={disabledState} />
          ))
        }
      </div>

      <p>Turns: {turns}</p>

    </div>
  );
}

export default App;
