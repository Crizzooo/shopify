import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import User from './User';


export class UserCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user

    return (
      <div className="list-group-item min-content user-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            {/* <img className="media-object img-circle" src={user.photo} /> */}
          </div>
          <Link
            className="media-body"
            activeClassName="active"
            to={`/users/${user.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="John Doe">{user.firstName} {user.lastName}</span>
            </h4>
            <h5 className="tucked">
              <span>{user.email}</span>
            </h5>
          </Link>
          <div className="media-right media-middle">
            {/* {
              authorized ?
              <button
                  className="btn btn-default">
                  onClick={this.removeUserCallback}>
                <span className="glyphicon glyphicon-remove" />
              </button>
              : null
            } */}
          </div>
        </div>
      </div>
    )
  }
}
