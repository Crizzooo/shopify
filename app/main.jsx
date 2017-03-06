'use strict'
import React from 'react'
import store from './store'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

import Albums from './containers/Albums';
import Layout from './containers/Layout';
import Clothing from './containers/Clothing';
import CartContainer from './containers/CartContainer';
import ProductContainer from './containers/Products';
import AdminPanel from './containers/AdminPanel';
import User from './components/Admin/User';
import SingleProductContainer from './containers/singleProduct';


import {fetchAlbums, fetchClothing} from './reducers/products';

function fetchInitialData() {
  store.dispatch(fetchAlbums());
  store.dispatch(fetchClothing());
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} onEnter={fetchInitialData}>
        <IndexRoute component={ProductContainer} />
        <Route path="/product" component={SingleProductContainer} />
        <Route path="/products" component={ProductContainer} />
        <Route path='/cart' component={CartContainer} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/albums" component={Albums} />
        <Route path="/clothing" component={Clothing} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/user/:id" component={User} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
