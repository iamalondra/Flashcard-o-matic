import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import CardForms from "../../components/CardForms/CardForms";
import {readCard, updateCard} from "../../utils/api"
import { HouseFill } from "react-bootstrap-icons"

function EditCard({reload, deck}) {
  const [cardInfo, setCardInfo] = useState({})
  const {cardId} = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCardInfo() {
      try {
        const response =  await readCard(cardId, abortController.signal)
        setCardInfo(response);
      } catch (error) {
        throw error
      }
    }
    loadCardInfo();
    return () => {
      abortController.abort();
      console.log("aborted");
    };
  }, [cardId]);
  
  async function handleCardUpdate(formData){
      try {
        await updateCard(formData)
        reload();
        history.push(`/decks/${deck.id}`);
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
            <Link to="/decks/1">Deck {deck.name}</Link>
          </li>
          <li className="breadcrumb-item">Edit card {cardInfo.id}</li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <CardForms deck={deck.id} id={cardInfo.id} cardActions={handleCardUpdate} front={cardInfo.front} back={cardInfo.back} />
    </div>
  );
}

export default EditCard;
