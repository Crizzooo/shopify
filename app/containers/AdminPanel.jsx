import React, { Component } from 'react';
import { connect } from 'react-redux';

import Users from './Users';
// import Products from './Products';
// import Orders from './Orders';

class AdminPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdmin: true,
      id: 100,
      name: 'Alex Varona',
      emai: 'email@gmail.com'
    }
  }

  render() {
    return (
      <div>
        <h1>USERS</h1>
        <Users
          currentUser={this.state}
        />
        <h1>ORDERS</h1>
        {/* <Orders /> */}
        <h1>PRODUCTS</h1>
        {/* <Products /> */}
      </div>
    )
  }
}

export default AdminPanel;
