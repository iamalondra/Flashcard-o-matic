import React from "react";
import {useHistory} from "react-router-dom"
import { deleteDeck } from "../../utils/api";
import { EyeFill, JournalBookmarkFill, TrashFill } from "react-bootstrap-icons"

function DeckCard({deck}){
    const history = useHistory();

    function navigateToStudy(){
        history.push(`/decks/${deck.id}/study`)
    }

    function navigateToView(){
        history.push(`/decks/${deck.id}`)
    }

    function onDelete(){
        if(window.confirm("Are you sure you want to delete?")){
          try {
            deleteDeck(deck.id)
            window.location.reload(false)
          } catch (error) {
            console.log(error.message)
          }
        }
      }

    return(
    <div className="card p-4">
        <div className="row">
            <h3 className="col">{deck.name}</h3>
            <p className="col text-right">{deck.cards.length} cards</p>
        </div>
        <p> {deck.description} </p>
        <div className="row">
            <div className="col">
                <button onClick={navigateToView} className=" mr-2 btn btn-secondary">
                    <EyeFill/> view
                </button>
                <button onClick={navigateToStudy} className="btn btn-primary">
                    <JournalBookmarkFill/> study
                </button>
            </div>
            <div className="col d-flex flex-row-reverse">
                <button onClick={onDelete} className="btn btn-danger">
                    <TrashFill/>
                </button>
            </div> 
        </div>
    </div>
    )
}

export default DeckCard;