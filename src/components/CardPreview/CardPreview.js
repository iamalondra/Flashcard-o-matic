import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { deleteCard } from "../../utils/api";
import { TrashFill, PencilFill } from "react-bootstrap-icons"

function CardPreview({ card, reload }) {
  const history = useHistory();
  const { deckId } = useParams();

  function navigateToEditCard() {
    history.push(`/decks/${deckId}/cards/${card.id}/edit`);
  }

  async function onDelete() {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteCard(card.id);
        reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <li className="card">
      <div className="row p-4">
        <div className="col">
          <p>{card.front}</p>
        </div>
        <div className="col">
          <p>{card.back}</p>
          <button
            onClick={navigateToEditCard}
            className="btn btn-secondary mr-2"
          >
            <PencilFill/> edit
          </button>
          <button onClick={onDelete} className="btn btn-danger">
            <TrashFill/>
          </button>
        </div>
      </div>
    </li>
  );
}

export default CardPreview;
