import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "../routes/CreateDeck/CreateDeck";
import DeckRoutes from "../routes/Deck/DeckRoutes";
import Home from "../routes/Home/Home";
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <DeckRoutes />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
