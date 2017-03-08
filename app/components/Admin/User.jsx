import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import UserCard from './UserCard';
import {updateUser} from '../../reducers/users'

class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // isAdmin: props.user.isAdmin
    }
    console.log('states', this.state)
    this.saveUser = this.saveUser.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.passwordReset = this.passwordReset.bind(this);
  }

  render() {

    const { user, currentUser } = this.props;
        if (!user) return <div />  // the user id is invalid or data isn't loaded yet
        const authorized = currentUser && (currentUser.isAdmin || currentUser.id === user.id);
    return (
      <div className="form-group">
        <UserCard user={user} />
        <form onSubmit={this.saveUser}>
          <div className="form-inline my-2">
            <h5>
              <div className="form-inline row">
                <label className="col-sm-4">Name</label>
                <input
                  className="form-control col-sm-4"
                  type="text"
                  defaultValue={user.firstName}
                  onChange={evt => {return this.setState({firstName: evt.target.value})}}
                />
                <input
                  className="form-control col-sm-4"
                  type="text"
                  defaultValue={user.lastName}
                  onChange={evt => this.setState({lastName: evt.target.value})} />
              </div>
              <div className="form-inline row">
                <label className="col-sm-4">Email</label>
                <input
                  className="form-control col-sm-8"
                  type="email"
                  defaultValue={user.email}
                  onChange={evt => this.setState({email: evt.target.value})}
                />
              </div>

              <div className="form-inline">
                <label className="col-sm-4">Admin</label>
                <input
                  className="form-control col-sm-2"
                  style={{}}
                  type="checkbox"
                  onChange={this.handleChange}
                  value={this.state.isAdmin}
                />
              </div>
              <div className="row">
                <div className="col-sm-2" />
                <button
                  className="btn btn-success col-sm-3"
                  onChange={this.passwordReset}> Password
                </button>
                <div className="col-sm-2" />
                <button
                  className="btn btn-primary col-sm-3">Submit
                </button>
              </div>
            </h5>
          </div>
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

  passwordReset() {
    
  }

  getInitialState() {
    return {isAdmin: true};
  }

  handleChange(event) {
      this.setState({isAdmin: !event.target.checked});
      console.log(this.state.isAdmin)
      this.props.user.isAdmin = this.state.isAdmin
  }

   saveUser(event) {
    // event.preventDefault();  // uncomment to not refrech page
    this.props.user.firstName = this.state.firstName
    this.props.user.lastName = this.state.lastName
    this.props.user.email = this.state.email
    console.log(this.props.user.isAdmin)
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
