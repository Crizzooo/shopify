import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCard from '../components/Admin/UserCard';
// import User from '../components/Admin/User'

const whiteFont = {color: "white"}

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: 'John',
        lastName: 'Hancock',
        email: 'johnnyHC@gmail.com'
      }
    }
    this.filterUser = this.filerUser.bind(this)
  }

  render() {

    return (
      <div>
        <div>
          <label style={{fontSize: 36, color: 'white'}}>USERS</label>
          <input className="btn btn-sm" placeholder="Search for users..." />
        </div>
        <UserCard user="user" />
        <div className="flexContainer">
          {
            this.props.user.filter(this.filterUser)
            .map(user => <UserCard user={user} key={user.id} />)
          }
        </div>
      </div>
    )


  }

  filterUser(user) {
    const nameMatch  = new RegExp(this.state.firstName, 'i');
    const emailMatch = new RegExp(this.state.email, 'i');
    // const phoneMatch = new RegExp(this.state., 'i');

    return nameMatch.test(user.firstName)
    && emailMatch.test(user.email)
    // && phoneMatch.test(story.phone);
  }

}
export default Users
