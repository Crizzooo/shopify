import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../reducers/auth'
import { browserHistory } from 'react-router'

console.log('singup page')

class SignUpPage extends Component {

  constructor(props) {
    super(props);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {

    return (
      <form onSubmit={this.onSignupSubmit} >

            <input
              onChange={this.handleChange}
              name="firstName"
              type="firstName"
              className="form-control mr-sm-1"
              placeholder="First Name"
            />
            <input
              onChange={this.handleChange}
              name="lastName"
              type="lastName"
              className="form-control mr-sm-1"
              placeholder="Last Name"

            />
            <input
              onChange={this.handleChange}
              name="email"
              type="email"
              className="form-control mr-sm-1"
              placeholder="Email"

            />
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              className="form-control mr-sm-1"
              placeholder="Password"

            />
            <input
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              value="Submit"
            />
      </form>
    )
  }


  onSignupSubmit(event) {
    
    event.preventDefault();
    const user = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value
    }

    this.props.signup_wrapper(user)
    browserHistory.push(`/login`)

  }
}

const mapState = () => ({ message: 'Sign up' });

const mapDispatch = (dispatch) => {
  return {
    signup_wrapper: function (user) {
      dispatch(signup(user));
    }
  };
};


export default connect(mapState, mapDispatch)(SignUpPage);

