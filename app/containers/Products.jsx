import React, { Component } from 'react';
import { connect } from 'react-redux';
import Albums from './Albums';
import Clothing from './Clothing';

class ProductContainer extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h1>ALBUMS</h1>
        <Albums albums={this.props.albums} />
        <h1>CLOTHING</h1>
        <Clothing clothing={this.props.clothing} />
      </div>
    )
  }

}

const mapProps = state => {
  console.log('Mapping Props from state', state);
  return {
    message: state.products.message,
    clothing: state.products.clothing,
    albums: state.products.albums
  };
};

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    // what other data might we want to fetch on app load?
  }
});

export default connect(mapProps, mapDispatch)(ProductContainer);
