import React, { Component } from 'react';
import { connect } from 'react-redux';

import AlbumDetail from '../components/albumDetail';
import ClothingDetail from '../components/clothingDetail';


class SingleProductContainer extends Component {

  constructor(props) {
    super(props);
    console.log('\n\n Single Products Container', props);
  }


  render() {
    console.log('Do we have a currentProduct', this.props.currentProduct);
    return (
         this.props.currentProduct ?
              this.props.currentProduct.product_type === 'album' ?
              <AlbumDetail album={this.props.currentProduct} />
              :
              <ClothingDetail clothing={this.props.currentProduct} />
        :
        <div className="card singleProdCard">
          <img className="card-img-top productImage" src="http://www.designformusic.com/wp-content/uploads/2015/10/insurgency-digital-album-cover-design.jpg" alt="Card image cap" />
          <div className="card-block">
            <h1>PRODUCT NAME</h1>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><h3>Details</h3></li>
              <li className="list-group-item"><h4>Reviews</h4></li>
            </ul>
          </div>
        </div>
    )
  }

}

const mapProps = state => {
  console.log('Mapping Props for Single Prod', state);
  return {
    message: state.products.message,
    clothing: state.products.clothing,
    albums: state.products.albums,
    currentProduct: state.products.currentProduct
  };
};

const mapDispatch = dispatch => ({
  fetchCurrentProduct: () => {
    // what other data might we want to fetch on app load?
  }
});

export default connect(mapProps, mapDispatch)(SingleProductContainer);
