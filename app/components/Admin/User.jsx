import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import UserCard from './UserCard';
import {updateUser} from '../../reducers/users'

class User extends Component {

  constructor(props) {
    super(props)
    this.saveUser = this.saveUser.bind(this);
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
        <div className="media-left media-middle icon-container">
          <button
            onClick={this.removeUserCallback}
            className="btn btn-danger">REMOVE
          </button>
        </div>

        <UserCard user={user} />
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
                    console.log(this.state)
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
    const user = this.props = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }
    this.props.updateUser(user.id, user);
    event.target.firstName.value = ''
    event.target.lastName.value = ''
  }

}

const mapStateToProps = ({ users }, ownProps) => {
  const param_id = Number(ownProps.params.id);
  console.log(param_id)
  return {
    user: _.find(users, user => user.id === param_id)
  };
};

const mapDispatchToProps = {
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
