import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import UserCard from './UserCard';
import {updateUser} from '../../reducers/users'

class User extends Component {

  constructor(props) {
    super(props)
    this.state = this.props.user
    this.saveUser = this.saveUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {

    const { user, currentUser } = this.props;
        if (!user) return <div />  // the user id is invalid or data isn't loaded yet
        const authorized = currentUser && (currentUser.isAdmin || currentUser.id === user.id);

    return (
      <div className="form-group">
        <UserCard user={user} />
        <form onSubmit={this.saveUser}>
          <div className="form-inline my-2 my-lg-0">
            <h5>
              <div className="form-inline">
              <label>Name</label>
                <input
                  className="form-control mr-sm-1"
                  type="text"
                  defaultValue={user.firstName}
                  onChange={evt => {
                    console.log(this.state)
                    return this.setState({firstName: evt.target.value})
                  }
                } />
                <input
                  className="form-control mr-sm-1"
                  type="text"
                  defaultValue={user.lastName}
                  onChange={evt => this.setState({lastName: evt.target.value})} />
              </div>
              <div className="form-inline">
                <label>Email</label>
                <input
                  className="form-control mr-sm-1"
                  type="email"
                  defaultValue={user.email}
                  onChange={evt => this.setState({email: evt.target.value})} />
              </div>

              <div className="form-inline">
                <label>Admin Status</label>
                  <input
                    className="form-control mr-sm-1"
                    type="checkbox"
                    onChange={this.handleChange}
                    checked={user.isAdmin} />
              </div>
            </h5>
            <button
              className="btn btn-primary">Submit
            </button>
          </div>
        </form>
        {console.log('USERS state before change', this.state)}

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
              placeholder="Address"
              onChange={evt => this.setState({address: evt.target.value})} />
            {/* <input
              className="form-control mr-sm-1"
              style={{width: '100%'}}
              type="text"
              placeholder="Address 2"
              // onChange={evt => this.setState({lastName: evt.target.value})} /> */}
            <div className="form-inline">
              <input
                className="form-control mr-sm-1"
                type="text"
                placeholder="City"
                onChange={evt => this.setState({city: evt.target.value})} />
              <input
                className="btn btn-dropdown form-control mr-sm-1"
                data-toggle="toggle"
                placeholder="State"
                onChange={evt => this.setState({state: evt.target.value})} />
              <input
                className="form-control mr-sm-1"
                type="text"
                placeholder="Zip Code"
                onChange={evt => this.setState({zip: evt.target.value})} />
            </div>
          </h5>
          <button
            className="btn btn-primary">Save
          </button>
        </form>

      </div>
    )
  }

  handleChange(event) {
    // console.log('value', event.target.value)
    console.log('admin',this.props.user.isAdmin)
    if (this.props.user.isAdmin) {
      this.setState({isAdmin: false})
      // this.props.user.isAdmin = false
      console.log('hit checked false', this.props)
    } else {
      this.setState({isAdmin: true})
      // this.props.user.isAdmin = true
      console.log('hit checked true', this.props)
    }
      this.props.user.isAdmin = this.state.isAdmin // allows the checkbox
      console.log('props now', this.props)
  }

   saveUser(event) {
    // event.preventDefault();  // uncomment to not refrech page
    this.props.user.firstName = this.state.firstName
    this.props.user.lastName = this.state.lastName
    this.props.user.email = this.state.email
    this.props.user.isAdmin = this.state.isAdmin
    console.log('being sent', this.props.user)
    this.props.updateUser(this.props.user.id, this.props.user);
  }

}

const mapStateToProps = ({ users }, ownProps) => {
  const param_id = Number(ownProps.params.id);
  console.log(param_id)
  return {
    user: _.find(users, user => user.id === param_id)
  };
};

const mapDispatchToProps = {updateUser};

export default connect(mapStateToProps, mapDispatchToProps)(User);
