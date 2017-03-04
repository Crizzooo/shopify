import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCard from '../components/Admin/UserCard';

export class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: 'John',
        lastName: 'Hancock',
        email: 'johnnyHC@gmail.com',
        id: 1
      }
    }
  }

  render() {

    return (
      <div>
        <div className="user-query">
          { this.searchUser() }
          {/* { this.props.isAdmin ? this.renderNewUserWidget() : null } */}
        </div>
        <br />
        <br />
        {/* ITERATE THROUGH USERCARDS */}
        {/* <div className="user-list">
          {
            this.state.users
            .filter(this.filterUser)
            .map(user => <UserCard user={user} key={user.id} />)
          }
        </div> */}


        <UserCard user={this.state.user} />
      </div>
    )
  }

  searchUser() {
    return (
      <div className="list-group-item min-content user-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            <span className="glyphicon glyphicon-search" />
          </div>
          <div className="media-body">
            <h4 className="media-heading tucked">
              <input
                type="text"
                placeholder="Jean Doe"
                className="form-like"
                // onChange={evt => this.setState({ name: evt.target.value })}
              />
            </h4>
            <h5 className="tucked">
              <input
                 type="email"
                 placeholder="email@website.com"
                 className="form-like"
                //  onChange={evt => this.setState({ email: evt.target.value })}
              />
            </h5>
          </div>
        </div>
      </div>
    );
  }

}

// const mapState = ({ users, currentUser }) => (
//   {
//     isAdmin: currentUser && currentUser.isAdmin,
//     users
//   }
// );
//
// const mapDispatch = { addUser };
//
// export default connect(mapState, mapDispatch)(Users);
