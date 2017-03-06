import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import UserCard from './UserCard';

class User extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { user, currentUser } = this.props;
        if (!user) return <div />  // the user id is invalid or data isn't loaded yet
        const authorized = currentUser && (currentUser.isAdmin || currentUser.id === user.id);

    return (
      <div className="form-group">
        <form onSubmit={console.log('submittedADSfasdgasdg')}>
          {/* <h1>{user.firstName} {user.lastName}</h1> */}
          <UserCard user={user} />
          <div className="form-inline my-2 my-lg-0">
            <h5>Name:
              <input className="form-control mr-sm-1" type="text" value={this.props.name} />
              {console.log('user props this is it',this.props)}
              <input className="form-control mr-sm-1" type="text" value={user.lastName} />
            </h5>
          </div>


          <div className="form-inline my-2 my-lg-0">
            <h5>Email:
              <input className="form-control mr-sm-1" type="email" value={user.email} />
            </h5>
          </div>

          <div className="form-inline my-2 my-lg-0">
            <h5>Address:
              <input className="form-control mr-sm-1" type="text" value="Address" />
              <input className="form-control mr-sm-1" type="text" value="City" />
              <input className="btn btn-dropdown form-control mr-sm-1" data-toggle="toggle" value="State" />
              <input className="form-control mr-sm-1" type="text" value="Zip Code" />
            </h5>
          </div>

          <div>password reset</div>

          <div className="form-inline my-2 my-lg-0">
            <h5>Admin:
              <input className="form-control mr-sm-1" value='yes' type="checkbox" />
            </h5>
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = ({ users, stories, currentUser }, ownProps) => {
  const param_id = Number(ownProps.params.id);
  return {
    user: _.find(users, user => user.id === param_id),
    currentUser
  };
};


export default connect(mapState)(User);
