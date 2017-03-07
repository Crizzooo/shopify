import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import UserCard from './UserCard';
import {updateUser} from '../../reducers/users'

class User extends Component {

  constructor(props) {
    super(props)
    this.saveUser = this.saveUser.bind(this);
    console.log('this', this)
    this.state = {
      firstName: '',
      lastName: ''
    }
    console.log('user.props', this.props)
  }

  render() {

    const { user, currentUser } = this.props;
        if (!user) return <div />  // the user id is invalid or data isn't loaded yet
        const authorized = currentUser && (currentUser.isAdmin || currentUser.id === user.id);

    return (
      <div className="form-group">
        Remove user card?
        {/* <i className="material-icons">search</i> */}

        <div className="media-left media-middle icon-container">
          <button
            onClick={this.removeUserCallback}
            className="btn btn-danger">REMOVE
          </button>
        </div>

        <UserCard user={user} />
        {console.log('props here',this.props)}
        <form onSubmit={this.saveUser}>
          <div className="form-inline my-2 my-lg-0">
            <h5>
              <div className="form-inline">
              <label>Name</label>
                <input
                  className="form-control mr-sm-1"
                  type="text"
                  // defaultValue={user.firstName}
                  onChange={evt => {
                    console.log('firstname state', this.state)
                    return this.setState({firstName: evt.target.value})
                  }
                } />
                <input
                  className="form-control mr-sm-1"
                  type="text"
                  // defaultValue={user.lastName}
                  onChange={evt => this.setState({lastName: evt.target.value})} />
              </div>

              <div className="form-inline">
                <label>Email</label>
                <input
                  className="form-control mr-sm-1"
                  type="email"
                  defaultValue={user.email} />
              </div>

              <div className="form-inline">
                <label>Admin Status</label>
                <input
                  className="form-control mr-sm-1"
                  defaultValue={user.isAdmin}
                  type="checkbox" />
              </div>
            </h5>
            <button
              className="btn btn-primary">Submit
            </button>
          </div>
        </form>

        {/* PASSWORD RESET */}
        <form onSubmit={this.passwordReset}>
          <button
            className="btn btn-success">Password Reset
          </button>
        </form>

        {/* EDIT ADDRESS */}
        <form
          onSubmit={this.saveAddress}
          className="form-inline my-2 my-lg-0">
          <h5>
            <label>Address</label>
            <input
              className="form-control mr-sm-1"
              style={{width: '100%'}}
              type="text"
              placeholder="Address" />
            <input
              className="form-control mr-sm-1"
              style={{width: '100%'}}
              type="text"
              placeholder="Address 2" />
            <div className="form-inline">
              <input
                className="form-control mr-sm-1"
                type="text"
                placeholder="City" />
              <input
                className="btn btn-dropdown form-control mr-sm-1"
                data-toggle="toggle"
                placeholder="State" />
              <input
                className="form-control mr-sm-1"
                type="text"
                placeholder="Zip Code" />
            </div>
          </h5>
          <button
            className="btn btn-primary">Save
          </button>
        </form>

      </div>
    )
  }

   saveUser(event) {
    event.preventDefault();
    console.log('saving user', this.state);
    console.log('saving props', this.props)

      this.props.user.firstName = this.state.firstName
      this.props.user.lastName = this.state.lastName

    console.log(this.props.user)
    this.props.updateUser(this.props.user.id, this.props.user)
    // event.target.firstName.value = ''
    // event.target.lastName.value = ''
  }

}

const mapStateToProps = ({ users }, ownProps) => {
  console.log('users map to state', users)
  console.log('own props', ownProps)
  const paramId = Number(ownProps.params.id);
  for (let i = 0; i < users.length; i++) {
    let user = {}
    if (users[i].id === paramId) {
      user = users[i]
    }
    console.log('props user', user);
    return {
      user: user
    }
  }
};

const mapDispatchToProps = {updateUser};

export default connect(mapStateToProps, mapDispatchToProps)(User);
