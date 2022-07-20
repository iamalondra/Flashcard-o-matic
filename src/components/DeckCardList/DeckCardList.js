import React from "react";
import DeckCard from "../DeckCard/DeckCard";

function DeckCardList({ decksList }) {
  const realDeckList = decksList.map((deck) => (
    <li key={deck.id}>
      <DeckCard deck={deck} />
    </li>
  ));
  return (
    <div>
      <ul className="list-unstyled">{realDeckList}</ul>
    </div>
  );
}

export default DeckCardList;
