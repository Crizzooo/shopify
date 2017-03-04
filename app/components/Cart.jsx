//For a single cart item

import React, { Component } from 'react'


export default class Cart extends Component {
  // componentDidMount() {
  // }
  constructor(props){
    super(props)
  }


  render() {

    const cartItem = this.props.cartItem
    console.log('in dumb component, cartItem is:', cartItem)

    return (
      <div>
            {
              <ul key={cartItem} className="text-muted"> product id: {cartItem.product_id} </ul>
            }
      </div>
    )
  }
}
