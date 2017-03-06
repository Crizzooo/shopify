import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../reducers/users';
import UserCard from '../components/Admin/UserCard';

class Users extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   id: 1,
    //   name: 'John Hancock',
    //   email: 'johnnyHC@gmail.com',
    //   isAdmin: true
    // }
    console.log('PROPS IN USERS', props)
    this.filterUser = this.filterUser.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div className="user-query">
          Search User
          { this.searchUser() }
          {/* { this.props.isAdmin ? this.newUser() : null } */}
          New User
          {this.newUser()}
        </div>
        <br />
        <br />
        {/* ITERATE THROUGH USERCARDS */}
        <div className="user-list">
          All Users
          {/* {console.log('THIS IN USERS', this)}
          {console.log('PROPS IN USERS FOR FILTER', this.props.users)} */}

          {/* {console.log(this.props.users)} */}
          {console.log('THIS IS STATE',this.state)}
          {
            this.props.users
            .filter(this.filterUser)
            .map(user => <UserCard user={user} key={user.id} />)
          }
        </div>
        {/* <UserCard user={this.props} /> */}
      </div>
    )
  }

  filterUser(user) {
    console.log('state', this.state)
    const nameMatch = new RegExp(this.state.name, 'i');
    const emailMatch = new RegExp(this.state.email, 'i')
    // console.log('user name in filter', nameMatch.test(user.name))
    return nameMatch.test(user.name)
      && emailMatch.test(user.email)
  }

  searchUser() {
    return (
      <div className="list-group-item min-content user-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            {/* Font awesome icon here */}
          </div>
          <div className="media-body">
            <h4 className="media-heading tucked">
              <input
                type="text"
                placeholder="Jane Doe"
                className="form-like"
                onChange={evt => this.setState({ name: evt.target.value })}
              />
            </h4>
            <h5 className="tucked">
              <input
                 type="email"
                 placeholder="email@website.com"
                 className="form-like"
                 onChange={evt => this.setState({ email: evt.target.value })}
              />
            </h5>
          </div>
        </div>
      </div>
    );
  }

  newUser() {
      return (
        <div className="list-group-item min-content user-item">
          <form className="media" onSubmit={this.submit}>
            <div className="media-body">
              <h4 className="media-heading tucked">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="form-like"
                />
              </h4>
              <h5 className="tucked">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="email@website.com"
                  className="form-like"
                />
              </h5>
            </div>
            <div>
              <button
                className="btn btn-primary"
                type="submit">Add
              </button>
            </div>
          </form>
        </div>
      );
    }

  submit(event) {
    event.preventDefault();
    const user = {
      name: event.target.name.value,
      email: event.target.email.value
    };
    console.log('submit props from user', this.props.addUser(user))
    // this.props.addUser(user);
    event.target.name.value = '';
    event.target.email.value = '';
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
// (
//   {
//     // isAdmin: currentUser && currentUser.isAdmin,
//   }
// );

const mapPropsToDispatch = { addUser };

export default connect(mapStateToProps, mapPropsToDispatch)(Users);
