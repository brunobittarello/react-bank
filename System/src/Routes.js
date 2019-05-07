import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Contacts from "./containers/Contacts";
import CreditCards from "./containers/CreditCards";
import History from "./containers/History";
import Transfer from "./containers/Transfer";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/contacts" exact component={Contacts} />
    <Route path="/cards" exact component={CreditCards} />
    <Route path="/history" exact component={History} />
    <Route path="/transfer" exact component={Transfer} />
    
    <Route component={NotFound} />
  </Switch>;
