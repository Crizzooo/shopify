import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { removeUser } from '../../reducers/users';

class UserCard extends Component {

  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    console.log('props in usercard', this.state)
    console.log('props', this.props.user)
  }

  render() {
    const { user, currentUser } = this.props;
    console.log(this.props)
    const authorized = currentUser && (currentUser.isAdmin || currentUser.id === user.id);
    return (
      <div className="list-group-item min-content user-item">
        <div className="media-left media-middle icon-container">
          <button
            onClick={this.deleteUser}
            className="btn btn-danger">REMOVE
          </button>
        </div>
        <div className="media">
          <Link
            className="media-body"
            activeClassName="active"
            to={`/users/${user.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="John Doe">{user.fullName}</span>
            </h4>
            <h5 className="tucked">
              <span>{user.email}</span>
            </h5>
          </Link>
          <div className="media-right media-middle">
            {
              authorized ?
              <button
                  className="btn btn-default"
                  onClick={this.removeUserCallback}>
                <span className="glyphicon glyphicon-remove" />
              </button>
              : null
            }
          </div>
        </div>
      </div>
    )
  }

  deleteUser() {
    this.props.removeUser(this.props.user.id)
  }
}

const mapStateToDispatch = ({ currentUser }) => ({ currentUser });

const mapDispatchToProps = { removeUser };

export default connect(mapStateToDispatch, mapDispatchToProps)(UserCard);
