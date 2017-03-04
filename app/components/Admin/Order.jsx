import React, { Component } from 'react';
import { connect } from 'react-redux';

const whiteFont = {color: "white"}

class Order extends Component {

  render() {
    return (

      <div>
        <form style={whiteFont}>
          <input className="btn btn-md dropdownToggle" />
        </form>
      </div>
    )
  }
}

export default Order
