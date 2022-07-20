import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import { HouseFill } from "react-bootstrap-icons"

function Study({ deck }) {
  const { deckId } = useParams();
  const [currentCard, setCurrentCard] = useState(0);

  if (!deck) {
    return "no deck";
  }

  if (deck.cards === undefined) {
    return "no cards";
  }


  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <HouseFill/> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            study
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: study</h1>
      <Card
        cardTotal={deck.cards.length}
        currentCard={currentCard}
        changeCurrentCard={setCurrentCard}
        deck={deck}
      />
    </div>
  );
}

export default Study;
