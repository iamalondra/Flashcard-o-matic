import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";
import Study from "./Study";
import Deck from "./Deck";
import { readDeck } from "../../utils/api/index";

function DeckRoutes() {
  const { path } = useRouteMatch();
  const { deckId } = useParams();
  const [deckInfo, setDeckInfo] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeckInfo() {
      try {
        const response = await readDeck(deckId, abortController.signal);

        setDeckInfo(response);
      } catch (error) {
        throw error;
      }
    }
    loadDeckInfo();
    return () => {
      abortController.abort();
      console.log("aborted");
    };
  }, [deckId]);

  async function reloadData(){
    const response = await readDeck(deckId)
    setDeckInfo(response);
  }

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Deck deck={deckInfo} reload={reloadData}/>
      </Route>
      {/* /decks/:deckId/study	 */}
      <Route path={`${path}/study`}>
        <Study deck={deckInfo}/>
      </Route>
      {/* /decks/:deckId/edit	 */}
      <Route path={`${path}/edit`}>
        <EditDeck reload={reloadData} deck={deckInfo}/>
      </Route>
      {/* /decks/:deckId/cards/new	 */}
      <Route path={`${path}/cards/new`}>
        <AddCard reload={reloadData} deck={deckInfo}/>
      </Route>
      {/* /decks/:deckId/cards/:cardId/edit	 */}
      <Route path={`${path}/cards/:cardId/edit`}>
        <EditCard reload={reloadData} deck={deckInfo}/>
      </Route>
    </Switch>
  );
}

export default DeckRoutes;
