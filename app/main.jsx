'use strict'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './Routes.jsx';
import Layout from './Layout';
import LoginPage from './components/LoginPage';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {fetchProducts, testDispatcher} from './reducers/products';

function onEnterHome() {
  store.dispatch(testDispatcher('test msg'));
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} onEnter={onEnterHome}>
        <Route path="login" component={LoginPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
