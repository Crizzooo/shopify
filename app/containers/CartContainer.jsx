import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { fetchCart } from '../reducers/cart'


class CartContainer extends React.Component {

  constructor(props) {
    super(props)
    console.log('cart props',props)
  }


  render () {

    return (
      <div>
            <Cart cart = {this.props.cart}/>
            {console.log('props for cart', this.props)}
          </div>
        )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCart(cart) {
      dispatch(fetchCart(cart))
    }
  }

}

export default connect(mapStateToProps)(CartContainer);
