'use strict'
import React from 'react'
import store from './store'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import LoginPage from './components/LoginPage';

import Layout from './containers/Layout';
import Albums from './containers/Albums';

import {fetchAlbums, testDispatcher} from './reducers/products';

// function onEnterHome() {
//   store.dispatch(testDispatcher('test msg'));
// }

function fetchInitialData() {
  store.dispatch(fetchAlbums());
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} onEnter={fetchInitialData}>
        <IndexRoute component={Albums} />
        <Route path="login" component={LoginPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
