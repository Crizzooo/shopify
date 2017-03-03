'use strict'
import React from 'react'
import store from './store'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


import LoginPage from './components/LoginPage';
import Albums from './containers/Albums';
import Layout from './containers/Layout';
import SignUpPage from './components/SignUpPage';
import Products from './containers/Products';
import Clothing from './containers/Clothing';
// import Cart from './containers/Cart';

import {fetchAlbums, fetchClothing} from './reducers/products';

function fetchInitialData() {
  store.dispatch(fetchAlbums());
  store.dispatch(fetchClothing());
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} onEnter={fetchInitialData}>
        <IndexRoute component={Products} />
        <Route path="/products" component={Products} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/albums" component={Albums} />
        <Route path="/clothing" component={Clothing} />
        
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
