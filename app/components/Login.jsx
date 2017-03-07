import React from 'react'

export const Login = ({ login }) => (

  <div>
  <form id="loginform" onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <input id="username" className="form-control mr-sm-1" placeholder="Username" name="username" />
    <input id="password" className="form-control mr-sm-1" placeholder="Password" name="password" type="password" />
    <input
		id="loginbtn"
		className="btn btn-outline-success my-2 my-sm-0" 
		type="submit"
		value="Login"
    />
  </form>

  <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/api/auth/login/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>Login with Google</span>
            </a>
          </p>
	</div>
	</div>
)


import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(null, {login})(Login)
