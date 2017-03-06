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
import Clothing from './containers/Clothing';
import ProductContainer from './containers/Products';
import SingleProductContainer from './containers/singleProduct';

import {fetchAlbums, fetchClothing, fetchCurrentProduct} from './reducers/products';

function fetchInitialData() {
  store.dispatch(fetchAlbums());
  store.dispatch(fetchClothing());
}

function fetchCurrent(nextRouterState) {
  console.log('Next Router:', nextRouterState);
  store.dispatch(fetchCurrentProduct(nextRouterState.params.id));
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} onEnter={fetchInitialData}>
        <IndexRoute component={ProductContainer} />
        <Route path="/product/:id" component={SingleProductContainer} onEnter={fetchCurrent} />
        <Route path="/products" component={ProductContainer} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/albums" component={Albums} />
        <Route path="/clothing" component={Clothing} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
