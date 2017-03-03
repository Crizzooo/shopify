import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import User from './User';

const whiteFont = {color: "white"}

class UserCard extends Component {

  constructor(props) {
    super(props);
  }

  editUser() {
    console.log('edited')
  }

  deleteUser() {
    console.log('removed')
  }

  render() {
    const user = this.props.user

    return (
      <div style={whiteFont}>
        <form className="form-inline">
          <h1>{user.firstName} {user.lastName}</h1>

          <Link to="/user" className="" onClick={this.editUser}>edit</Link> |

          <Link to="/users" onClick={this.deleteUser}>delete</Link>
        </form>
        <User user={user} />
      </div>
    )
  }
}

export default UserCard
