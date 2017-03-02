  import React from 'react'

export const Login = ({ login }) => (
  <form className="form-inline my-2 my-lg-0"onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <input className="form-control mr-sm-1" placeholder="Username" name="username" />
    <input className="form-control mr-sm-1" placeholder="Password" name="password" type="password" />
    <input className="btn btn-outline-success my-2 my-sm-0" type="submit" value="Login" />
  </form>
)


import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  null,
  {login},
)(Login)
