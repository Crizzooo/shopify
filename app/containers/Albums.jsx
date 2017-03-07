import React, { Component } from 'react';
import { connect } from 'react-redux';
import Album from '../components/Album';
import { addToCart } from '../reducers/cart'

class Albums extends Component {
  // componentDidMount() {
  // }
  constructor(props) {
    super(props);
    console.log('\n\n\nALBUM COMPONENT', props);
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart (album) {
    // const product = evt.target.value
    const userId = 1 //will need to take this off the session eventually
    this.props.addItem(userId, album.product_id)
  }

  render() {
    console.log('rendering albums!', this.props);
    return (
        <div className="flexContainer">
          {
            this.props.albums && this.props.albums.map(album => (
              <Album album={album} key={album.id} handleAddToCart={this.handleAddToCart} printAlbum={this.printOutAlbum}/>
            ))
          }
        </div>
    )
  }

}

const mapProps = state => {
  console.log('Mapping Props from state', state);
  return {
    message: state.products.message,
    albums: state.products.products.albums
  };
};

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    // what other data might we want to fetch on app load?
  },
  addItem: (userId, productId) => {
    dispatch(addToCart(userId, productId))
  }
});

export default connect(mapProps, mapDispatch)(Albums);
