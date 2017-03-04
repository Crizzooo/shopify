import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { fetchCart } from '../reducers/cart'


class CartContainer extends React.Component {

  constructor(props) {
    super(props)
    console.log('this.props is:', this.props)
  }


  render () {
    const cart = this.props.cart;
    return (
            <div>
              <h2 className="text-success">Your Cart</h2>
              <div className="flexContainer">
              {cart && cart.map(cartItem => (
                <Cart cartItem={cartItem} key={cartItem.id}/>
                ))
            }
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
