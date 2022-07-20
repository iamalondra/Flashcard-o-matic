import React, { useState } from "react";
import {useHistory} from "react-router-dom"

function Card({ changeCurrentCard, cardTotal, currentCard, deck }) {
  const [flip, setFlip] = useState(true);
  const history = useHistory();

  function navigateToAddCard() {
    history.push(`/decks/${deck.id}/cards/new`);
  } 

  if(deck.cards.length === 0 || deck.cards.length <= 2){
    return(
      <div>
      <h2>Not enough cards.</h2>
       <p>You need at least 3 cards to study. There are only {cardTotal} in this deck.</p>
       <button className="btn btn-primary" onClick={navigateToAddCard}>Add card</button>
      </div>
    )
  }

  const { front, back } = deck.cards[currentCard];
  
  function onNext() { 

    if (currentCard === deck.cards.length-1) {
      if (window.confirm("you're at the end")) {
        changeCurrentCard(0)
        setFlip(true)
      } else {
        history.push("/")
      }
    } else {
      changeCurrentCard(currentCard + 1)
      setFlip(true)
    }
  }

  if (flip === true) {
    return (
      <div className="card p-4">
        <div className="row">
          <div className="col">
            <h3>
              Card {currentCard + 1} of {cardTotal}
            </h3>
            <p> {front} </p>
            <button
              className="btn btn-secondary"
              onClick={() => setFlip(false)}
            >
              flip
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card p-4">
        <div className="row">
          <div className="col">
            <h3>
              Card {currentCard + 1} of {cardTotal}
            </h3>
            <p> {back} </p>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => setFlip(true)}
            >
              Flip
            </button>
            <button className="btn btn-primary" onClick={onNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
