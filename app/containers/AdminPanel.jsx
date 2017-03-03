import React, { Component } from 'react';
import { connect } from 'react-redux';

import Product from '../components/Admin/Product';
import Users from '../containers/Users';
import Products from '../containers/Products';

const whiteFont = {color: "white"}

class AdminPanel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Users />
        {/* <Orders /> */}
        {/* <Products /> */}
      </div>
    )
  }
}

export default AdminPanel
