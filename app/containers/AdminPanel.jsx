import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Product from '../components/Admin/Product';
import Users from './Users';
import Products from './Products';
import Orders from './Orders';

export class AdminPanel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>USERS</h1>
        {/* <Users /> */}
        <h1>ORDERS</h1>
        {/* <Orders /> */}
        <h1>PRODUCTS</h1>
        {/* <Products /> */}
      </div>
    )
  }
}
