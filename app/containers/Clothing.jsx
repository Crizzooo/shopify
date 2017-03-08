import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClothingItem from '../components/ClothingItem';
import { addToCart } from '../reducers/cart'

class ClothingContainer extends Component {

  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart (clothing) {
    const userId = 1 //will need to take this off the session eventually
    this.props.addItem(userId, clothing.product_id)
  }


  render() {
    return (
      <div>
        <h1>Clothing</h1>
        <div className="flexContainer">
          {
            this.props.clothing ?
            this.props.clothing.map(clothing => (
              <ClothingItem clothing={clothing} key={clothing.id} handleAddToCart={this.handleAddToCart} />
            ))
            :
            this.props.allClothing.map(clothing => (
              <ClothingItem clothing={clothing} key={clothing.id} />
            ))
          }
        </div>
      </div>
    )
  }

}

const mapProps = state => {
  return {
    message: state.products.message,
    allClothing: state.products.products.clothing
  };
};

const mapDispatch = dispatch => ({
  fetchInitialData: () => {

  },
  addItem: (userId, productId) => {
    dispatch(addToCart(userId, productId))
  }
});

export default connect(mapProps, mapDispatch)(ClothingContainer);
