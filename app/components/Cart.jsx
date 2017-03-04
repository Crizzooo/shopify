import React, { Component } from 'react'


export default class Cart extends Component {
  // componentDidMount() {
  // }
  constructor(props){
    super(props)
  }


  render() {

    const cart = this.props.cart

    return (
      <div>
          <h2 className="text-success">Your Cart</h2>
          <div>
            {cart.map(cartItem => {
              return <ul key={cartItem.id} className="text-muted"> product id: {cartItem.product_id} </ul>
            })}
          </div>
      </div>
    )
  }
}
