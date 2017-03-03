import React, { Component } from 'react';

const whiteFont = {color: 'white'}

class User extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const user = this.props.user;

    return (
      <div style={whiteFont} className="form-group">
        <form onSubmit={console.log('submittedADSfasdgasdg')}>
          {/* <h1>{user.firstName} {user.lastName}</h1> */}
          <div className="form-inline my-2 my-lg-0">
            <h5>Name:
              <input className="form-control mr-sm-1" type="text" value={user.firstName} />
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

export default User
