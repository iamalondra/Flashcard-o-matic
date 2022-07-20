import React from "react";
import { Link, useHistory } from "react-router-dom";
import CardPreview from "../../components/CardPreview/CardPreview";
import { deleteDeck } from "../../utils/api";
import { HouseFill, TrashFill, JournalBookmarkFill, PlusLg, PencilFill } from "react-bootstrap-icons"

function Deck({ deck, reload }) {
  const history = useHistory();
  const { id, name, description, cards = [] } = deck;
  
  function navigateToEdit() {
    history.push(`/decks/${id}/edit`);
  }

  function navigateToStudy() {
    history.push(`/decks/${id}/study`);
  }

  function navigateToAddCard() {
    history.push(`/decks/${id}/cards/new`);
  }

  async function onDelete() {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteDeck(id);
        history.push("/")
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  const cardPList = cards.map((card) => (
    <CardPreview reload={reload} key={card.id} card={card} />
  ));

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <HouseFill/> Home
            </Link>
          </li>
          <li className="breadcrumb-item">{name}</li>
        </ol>
      </nav>
      <div className="mb-4">
        <h4>{name}</h4>
        <p>{description}</p>
        <div className="row">
          <div className="col">
            <button onClick={navigateToEdit} className="btn btn-secondary mr-2">
              <PencilFill/> edit
            </button>
            <button onClick={navigateToStudy} className="btn btn-primary mr-2">
              <JournalBookmarkFill/> study
            </button>
            <button onClick={navigateToAddCard} className="btn btn-primary">
              <PlusLg/> add cards
            </button>
          </div>
          <div className="col d-flex flex-row-reverse">
            <button onClick={onDelete} className="btn btn-danger">
              <TrashFill/>
            </button>
          </div>
        </div>
      </div>

      <h3>Cards</h3>
      <ul className="list-unstyled">{cardPList}</ul>
    </div>
  );
}

export default Deck;
