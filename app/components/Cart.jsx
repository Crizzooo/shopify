//For a single cart item

import React, { Component } from 'react'


export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.submitUpdatedQty(this.props.cartItem.id)
  }

  render() {

    const cartItem = this.props.cartItem
    const checkStock = this.props.checkStock
    const handleRemove = this.props.handleRemove
    const quantity = cartItem.quantity
    const handleUpdatedQty = this.props.handleUpdatedQty
    const submitUpdatedQty = this.props.submitUpdatedQty
    const updateQty = this.props.updateQty


    return (
        <tr>
          <td className="col-sm-8 col-md-6">
          <div className="media">
              <a className="thumbnail pull-left" href="#"> <img className="media-object" src="http://www.designformusic.com/wp-content/uploads/2015/10/insurgency-digital-album-cover-design.jpg" width="60" height="60" style={{marginRight: 20}} /> </a>
              <div>
                  <h4 className="media-heading"><a href="#" className="text-success">{cartItem.product.title}</a></h4>
                  <span>Status: </span>{checkStock(cartItem.product.inventory)}
              </div>
          </div></td>
          <td className="col-sm-1 col-md-1" >
            <form onSubmit={this.handleSubmit}>
              <input type="text" className="form-control" onChange={handleUpdatedQty} defaultValue={quantity}/>
              <button type="submit" className="btn btn-primary">
              update qty
              </button>
            </form>
          </td>
          <td className="col-sm-1 col-md-1 text-center"><strong>{`$${cartItem.product.price}`}</strong></td>
          <td className="col-sm-1 col-md-1 text-center"><strong>${(cartItem.product.price * quantity).toFixed(2)}</strong></td>
          <td className="col-sm-1 col-md-1">
          <button id="removeBtn" type="button" className="btn btn-danger" value={cartItem.product_id} onClick={handleRemove}>
              <span className="glyphicon glyphicon-remove" /> Remove
          </button></td>
        </tr>
            )
  }
}

