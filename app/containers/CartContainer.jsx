import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { deleteCartItem, updateItemQty, changeOrderStatus } from '../reducers/cart'
import { Link } from 'react-router'


class CartContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {updatedQty: ''}
    this.checkStock = this.checkStock.bind(this)
    this.subtotal = 0
    this.shippingCost = 5.00
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this)
    this.handleUpdatedQty = this.handleUpdatedQty.bind(this)
    this.submitUpdatedQty = this.submitUpdatedQty.bind(this)


  }

  checkStock (qty) {
    return qty > 0 ?
    <span className="text-success"><strong>In Stock </strong></span> :
    <span className="text-danger"><strong> Out of Stock </strong></span>

  }

  handleRemove (evt) {
    const productId = evt.target.value
    this.props.deleteItem(productId)
  }

  handleSubmitOrder (evt) {
    if(!this.props.cart || !this.props.cart.length){
      alert('Your cart is empty!')
    } else {
      const orderId = this.props.cart[0].order_id
      const orderStatus = 'Processing'
      this.props.changeOrder(orderId, orderStatus)


      }
  }

  handleUpdatedQty (evt) {
    const updatedQty = +evt.target.value || 0
    this.setState({updatedQty: updatedQty})
  }


  submitUpdatedQty (itemId) {
    const userId = 1 //hard-coded for now, replace with session user
    this.props.updateQty(userId, itemId, this.state.updatedQty)
  }

  render () {
    const cart = this.props.cart;

    const priceArray = cart && cart.map(cartItem => +cartItem.product.price)
    const totalArray = cart && cart.map(cartItem => +cartItem.product.price * cartItem.quantity)

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
                  cart && cart.length ? cart.map(cartItem => (
                    <Cart
                    cartItem={cartItem}
                    checkStock={this.checkStock}
                    handleRemove={this.handleRemove}
                    handleUpdatedQty={this.handleUpdatedQty}
                    submitUpdatedQty={this.submitUpdatedQty}
                    key={cartItem.id} />
                    )) :
                    <tr>
                      <td>Your cart is empty </td>
                    </tr>}
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h5>Subtotal</h5></td>
                        <td className="text-right"><h5><strong>${
                          cart && cart.length && totalArray.reduce((total, price) => {
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
                          cart && cart.length && (totalArray.reduce((total, price) => {
                            return total + price
                          }) + this.shippingCost).toFixed(2)
                        }</strong></h3></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td>
                        <a type="button" className="btn btn-default" href="/">
                            <span className="glyphicon glyphicon-shopping-cart" /> Continue Shopping
                        </a></td>
                        <td>
                          <Link to={cart && cart.length ? "/OrderSubmitted" : "/cart"} >
                            <button type="button" className="btn btn-success" onClick={this.handleSubmitOrder}>
                                Checkout <span className="glyphicon glyphicon-play" />
                            </button>
                          </Link>
                        </td>
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
    selectedItem: state.selectedItem,
  }
}

const mapDispatchToProps = dispatch => {
  return {

    deleteItem(selectedItem) {
      dispatch(deleteCartItem(selectedItem))
    },

    updateQty(userId, cartItemId, newQty) {
      dispatch(updateItemQty(userId, cartItemId, newQty))
    },

    changeOrder(orderId, orderStatus) {
      dispatch(changeOrderStatus(orderId, orderStatus))
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
