import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { CssBaseline } from "@material-ui/core";

import Products from "./components/Products";
import Categories from "./components/Categories/";
import Users from "./components/Users/";
import Roles from "./components/Roles/";
import Suppliers from "./components/Suppliers";
import Sales from "./components/Sales";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/roles" component={Roles} />
          <Route path="/suppliers" component={Suppliers} />
          <Route path="/categories" component={Categories} />
          <Route path="/products" component={Products} />
          <Route path="/sales" component={Sales} />
          <Route path="/" component={Users} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
