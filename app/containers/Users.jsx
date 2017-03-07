import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCard from '../components/Admin/UserCard';

class Users extends Component {

  constructor(props) {
    super(props);
    this.filterUser = this.filterUser.bind(this);
    this.searchUser = this.searchUser.bind(this);
    console.log('props in users', this.props)
    console.log('state in users', this.state)
  }

  componentWillMount() {
    return this.setState({users: this.props.users})
  }

  render() {
    return (
      <div className="container">
        <div className="user-query">
          Search User
          { this.searchUser() }
        </div>
        <br />
        <br />
        <div className="user-list">
          All Users
          {
            this.props.users
            .filter(this.filterUser)
            .map(user => {
              console.log('this is users', this)
              return <UserCard user={user} key={user.id} />
            })
          }
        </div>
      </div>
    )
  }

  filterUser(user) {
    const nameMatch = new RegExp(this.state.name, 'i');
    const emailMatch = new RegExp(this.state.email, 'i');
    return nameMatch.test(user.fullName)
      && emailMatch.test(user.email)
  }

  searchUser() {
    return (
      <div className="list-group-item min-content user-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            {/* Font awesome icon here */}
            {/* <i className="fa fa-search fa-5x" aria-hidden="true" style={{color: 'black'}}></i> */}
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

}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users);
