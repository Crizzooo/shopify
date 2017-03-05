import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { fetchCart } from '../reducers/cart'


class CartContainer extends React.Component {

  constructor(props) {
    super(props)
    this.checkStock = this.checkStock.bind(this)
    this.subtotal = 0
    this.dupItemsArray = []
    this.shippingCost = 5.00
  }


  checkStock (qty) {
    return qty > 0 ?
    <span className="text-success"><strong>In Stock </strong></span> :
    <span className="text-danger"><strong> Out of Stock </strong></span>
  }

  duplicateItemsCheck (itemId) {
    if (this.dupItemsArray.indexOf(itemId) === -1) {
      this.dupItemsArray.push(itemId)
      return true;
    } else return false
  }


  render () {
    const cart = this.props.cart;
    const priceArray = cart && cart.map(cartItem => +cartItem.product.price)
    console.log('cart is:', cart)
    let itemQty = {}
    itemQty = cart && Object.assign(itemQty, cart.forEach(cartItem => {
          if (itemQty[cartItem.product_id]) itemQty[cartItem.product_id] ++
            else itemQty[cartItem.product_id] = 1
          }
        ))
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
                  cart && cart.map(cartItem => (
                    this.duplicateItemsCheck(cartItem.product_id) ?
                    <Cart
                    cartItem={cartItem}
                    checkStock={this.checkStock}
                    itemQty = {itemQty}
                    key={cartItem.id} /> :
                    <tr key={cartItem.id} style={{display: 'none'}}/>
                ))}
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h5>Subtotal</h5></td>
                        <td className="text-right"><h5><strong>${
                          priceArray && priceArray.reduce((total, price) => {
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
                          priceArray && (priceArray.reduce((total, price) => {
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
                            <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                        </button></td>
                        <td>
                        <button type="button" className="btn btn-success">
                            Checkout <span className="glyphicon glyphicon-play"></span>
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


// <div>
//               <h2 className="text-success">Your Cart</h2>
//               <div className="flexContainer">
//               {cart && cart.map(cartItem => (
//                 <Cart cartItem={cartItem} key={cartItem.id}/>
//                 ))
//             }
//               </div>
//             </div>
