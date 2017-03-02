'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import Layout from './Layout';
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'

const LoginPage = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div id="loginForm">
      <nav>
        {user ? <WhoAmI /> : <Login />}
      </nav>
      {children}
    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <Route path="/login" component={LoginPage} />
        
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
