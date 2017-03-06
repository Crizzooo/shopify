import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { fetchCart, deleteCartItem } from '../reducers/cart'
import {uniqBy} from 'lodash'


class CartContainer extends Component {

  constructor(props) {
    super(props)
    this.checkStock = this.checkStock.bind(this)
    this.subtotal = 0
    this.shippingCost = 5.00
    this.handleRemove = this.handleRemove.bind(this)

  }

  checkStock (qty) {
    return qty > 0 ?
    <span className="text-success"><strong>In Stock </strong></span> :
    <span className="text-danger"><strong> Out of Stock </strong></span>
  }

  getQuantity(){}

  handleRemove (evt) {

    const productId = evt.target.value
    this.props.deleteItem(productId)

  }

  render () {
    const cart = this.props.cart;
    const priceArray = cart && cart.map(cartItem => +cartItem.product.price)


    //get the quantity of each item in the cart
    let itemQty = {}
    itemQty = cart && Object.assign(itemQty, cart.forEach(cartItem => {
          if (itemQty[cartItem.product_id]) itemQty[cartItem.product_id] ++
            else itemQty[cartItem.product_id] = 1
          }
        ))

    //only want to render items once, so create unique array
    const uniqCart = cart && uniqBy(cart, cartItem => {
        return cartItem.product_id
    })

    return (
  <div className="container">
    <div className="row">
        <div className="col-sm-12 col-md-10 col-md-offset-1">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Total</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>{
                  cart && cart.length ? uniqCart.map(cartItem => (
                    <Cart
                    cartItem={cartItem}
                    checkStock={this.checkStock}
                    handleRemove={this.handleRemove}
                    itemQty = {itemQty}
                    key={cartItem.id} />
                    )) :
                    <h3>Your cart is empty </h3>}
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h5>Subtotal</h5></td>
                        <td className="text-right"><h5><strong>${
                          cart && cart.length && priceArray.reduce((total, price) => {
                            return total + price
                          }).toFixed(2)
                        }</strong></h5></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h5>Estimated shipping</h5></td>
                        <td className="text-right"><h5><strong>${this.shippingCost.toFixed(2)}</strong></h5></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h3>Total</h3></td>
                        <td className="text-right"><h3><strong>${
                          cart && cart.length && (priceArray.reduce((total, price) => {
                            return total + price
                          }) + this.shippingCost).toFixed(2)
                        }</strong></h3></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td>
                        <button type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-shopping-cart" /> Continue Shopping
                        </button></td>
                        <td>
                        <button type="button" className="btn btn-success">
                            Checkout <span className="glyphicon glyphicon-play" />
                        </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
            )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cartItems,
    selectedItem: state.selectedItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCart(cart) {
      dispatch(fetchCart(cart))
    },
    deleteItem(selectedItem) {
      dispatch(deleteCartItem(selectedItem))
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
