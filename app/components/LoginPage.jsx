import React from 'react';
import { connect } from 'react-redux';
import Login from './Login'
import WhoAmI from './WhoAmI'

const LoginPage = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) => (
    <div id="loginForm">
      <nav>
        {user ? <WhoAmI /> : <Login />}
      </nav>
      {children}
    </div>
))

export default LoginPage;
