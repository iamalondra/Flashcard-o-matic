import React, { useEffect, useState } from "react";
import DeckCardList from "../../components/DeckCardList/DeckCardList";
import { useHistory } from "react-router-dom";
import { listDecks } from "../../utils/api";
import {PlusLg} from "react-bootstrap-icons"

function Home() {
  const [decksList, setDecksList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadLists() {
      try {
        const response = await listDecks(abortController.signal);
        setDecksList(response);
      } catch (error) {
        if (error.name === "Abort error") {
          console.log("Aborted");
        }else{
            throw error
        }
      }
    }
    loadLists();
    return () =>{
        abortController.abort()
    }
  }, []);
  function navigateToCreateDeck() {
    history.push("decks/new");
  }

  return (
    <React.Fragment>
      <button onClick={navigateToCreateDeck} className="mb-2 btn btn-secondary">
        <PlusLg/> create deck
      </button>
      <DeckCardList decksList={decksList}/>
    </React.Fragment >
  );
}

export default Home;
