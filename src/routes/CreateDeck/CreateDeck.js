import React from "react";
import {Link, useHistory} from "react-router-dom"
import DeckForm from "../../components/DeckForm/DeckForm";
import{createDeck} from "../../utils/api"
import { HouseFill } from "react-bootstrap-icons"

function CreateDeck() {
const history = useHistory();

  async function newDeck(formData){
    try {
      const theNewDeck = await createDeck(formData);
      history.push(`/decks/${theNewDeck.id}`);
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
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <DeckForm handleSubmit={newDeck}/>
    </div>
  );
}

export default CreateDeck;
