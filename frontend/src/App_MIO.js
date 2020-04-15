import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { CssBaseline, Grid } from '@material-ui/core';

import Products from './components/Products';
import Categories from './components/Categories';
import Users from './components/Users';
import Navigation from './components/Navigation';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container>
        <BrowserRouter>
          <Grid item>
            <Navigation />
          </Grid>
          <Grid item>
            <Switch>
              <Route path='/users'      component={Users} />
              <Route path='/products'   component={Products} />
              <Route path='/categories' component={Categories} />
              <Route path='/'           component={Users} />
            </Switch>
          </Grid>
        </BrowserRouter>
      </Grid>
    </React.Fragment>
    
  );
}

export default App;
