import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { changeOrderStatus } from '../reducers/cart'


export class OrderSubmitted extends Component {
  constructor(props) {
    super(props)

    this.handleCancelOrder = this.handleCancelOrder.bind(this)
    this.handleCompleteOrder = this.handleCompleteOrder.bind(this)

  }

  handleCancelOrder (evt) {
    const orderId = this.props.cart[0].order_id
    const orderStatus = 'Cancelled'
    this.props.changeOrder(orderId, orderStatus)
  }

  handleCompleteOrder (evt) {
    const orderId = this.props.cart[0].order_id
    const orderStatus = 'Completed'
    this.props.changeOrder(orderId, orderStatus)
  }
  render() {

    return (
      <div className="container">
        <tr>
          <td className="col-sm-8 col-md-6">
          <div className="media">
              <div>
                  <h4 className="media-heading"><a href="#" className="text-success">Thank you for your order!</a></h4>
                  <span>Your order is currently processing </span>
              </div>
          </div></td>
          <td className="col-sm-1 col-md-1" >
            <Link to="/">
              <button type="submit" className="btn btn-success">
              BUY MORE GEAR!
              </button>
            </Link>
          </td>
          <td> </td>
          <td></td>
          <td className="col-sm-1 col-md-1">
          <button id="removeBtn" type="button" className="btn btn-danger" onClick={this.handleCancelOrder} >
              <span className="glyphicon glyphicon-remove" /> Cancel Order
          </button></td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr>
          <td> </td>
          <td>
            <button id="completeBtn" type="button" className="btn btn-primary" onClick={this.handleCompleteOrder}>
              <span>
                My Order Has Arrived, Completed My Order
              </span>
            </button>
          </td>
        </tr>
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

    changeOrder(orderId, orderStatus) {
      dispatch(changeOrderStatus(orderId, orderStatus))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSubmitted)
