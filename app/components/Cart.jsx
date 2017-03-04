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
    const checkStock = this.props.checkStock
    const quantity = 2 //hard-coded for now

    return (
        <tr>
          <td className="col-sm-8 col-md-6">
          <div className="media">
              <a className="thumbnail pull-left" href="#"> <img className="media-object" src="http://www.designformusic.com/wp-content/uploads/2015/10/insurgency-digital-album-cover-design.jpg" width="50" height="50"/> </a>
              <div>
                  <h4 className="media-heading"><a href="#" className="text-success">{cartItem.product.title}</a></h4>
                  <span>Status: </span>{checkStock(cartItem.product.quantity)}
              </div>
          </div></td>
          <td className="col-sm-1 col-md-1" >
          <input type="email" className="form-control" id="exampleInputEmail1" value="1" />
          </td>
          <td className="col-sm-1 col-md-1 text-center"><strong>{`$${cartItem.product.price}`}</strong></td>
          <td className="col-sm-1 col-md-1 text-center"><strong>${(cartItem.product.price* quantity).toFixed(2)}</strong></td>
          <td className="col-sm-1 col-md-1">
          <button type="button" className="btn btn-danger">
              <span className="glyphicon glyphicon-remove"></span> Remove
          </button></td>
        </tr>
            )
  }
}
    //   <div>
    //         {
    //           <ul key={cartItem} className="text-muted"> product id: {cartItem.product_id} </ul>
    //         }
    //   </div>
