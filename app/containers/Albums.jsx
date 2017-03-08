import React, { Component } from 'react';
import { connect } from 'react-redux';
import Album from '../components/Album';
import { addToCart } from '../reducers/cart'

class Albums extends Component {

  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart (album) {
    const userId = 1 //will need to take this off the session eventually
    this.props.addItem(userId, album.product_id)
  }

  render() {

    return (
        <div>
          <h1>Albums</h1>
          <div className="flexContainer">
            {
              this.props.albums ?
              this.props.albums.map(album => (
                <Album album={album} key={album.id} handleAddToCart={this.handleAddToCart} printAlbum={this.printOutAlbum} />
              ))
              :
              this.props.allAlbums.map(album => (
                <Album album={album} key={album.id} handleAddToCart={this.handleAddToCart} printAlbum={this.printOutAlbum} />
              ))
            }
          </div>
        </div>
    )
  }

}

const mapProps = state => {

  return {
    message: state.products.message,
    allAlbums: state.products.products.albums
  };
};

const mapDispatch = dispatch => ({
  fetchInitialData: () => {

  },
  addItem: (userId, productId) => {
    dispatch(addToCart(userId, productId))
  }
});

export default connect(mapProps, mapDispatch)(Albums);
