import React from 'react'

export const WhoAmI = ({ user, logout }) => {

	return (
  <div className="whoami">
    <div className="alert alert-success" id="whoami-user-name">You are logged in as {user && user.fullName.toUpperCase() }</div>
    <button className="btn btn-outline-success" id="logout" onClick={logout}>Logout</button>
  </div>
)
}

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
