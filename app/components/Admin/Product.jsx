import React, { Component } from 'react';
import { connect } from 'react-redux';

const whiteFont = {color: "white"}

class Product extends Component {

  render() {
    return (

      <div>
        <form style={whiteFont}>
          <input className="btn btn-md dropdown"/>
        </form>
      </div>
    )
  }
}

export default Product
