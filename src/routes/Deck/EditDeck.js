import React from "react";
import {Link, useHistory} from "react-router-dom"
import DeckForm from "../../components/DeckForm/DeckForm"
import { updateDeck } from "../../utils/api";
import { HouseFill } from "react-bootstrap-icons"

function EditDeck({deck, reload}){
const history = useHistory();
  async function handleUpdateDeck(formData){
    try {
       await updateDeck(formData)
       reload();
       history.push(`/decks/${deck.id}`)
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
        <h1>Edit Deck</h1>
        <DeckForm deck={deck} handleSubmit={handleUpdateDeck} id={deck.id} name={deck.name} description={deck.description}/>
    </div>
  )
}

export default EditDeck;

