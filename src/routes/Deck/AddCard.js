import React from "react";
import{Link, useHistory} from "react-router-dom"
import CardForms from "../../components/CardForms/CardForms";
import {createCard} from "../../utils/api"
import { HouseFill } from "react-bootstrap-icons"

function AddCard({deck, reload}){ 
  const history = useHistory()
  
  async function newCard(formData){
    try {
      const theNewCard = await createCard(deck.id, formData)
      history.push(`/decks/${deck.id}`)
      reload();
    } catch (error) {
      console.log(error.message)
    }
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
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item">Add Card</li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
     <CardForms deck={deck.id} cardActions={newCard}/>
    </div>
  );
}

export default AddCard;
