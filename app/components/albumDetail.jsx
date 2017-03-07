import React, { Component } from 'react';
import { Link } from 'react-router';

export default class albumDetail extends Component {
  constructor(props) {
    super(props);
    console.log('Album Detail!');
    console.log('Album props:', props);
  }
  render() {
    return (
      <div className="card singleProdCard">
        <img className="card-img-top productImage" src={this.props.album.imageURL} alt="Card image cap" />
        <div className="card-block">
          <h1>{this.props.album.albums[0].name} - <i>{this.props.album.albums[0].artist.name}, {this.props.album.albums[0].year}</i></h1>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
              <h3>Details</h3>
              <ul>
                <li>Genre: {this.props.album.albums[0].genre}</li>
                <li>Price: ${this.props.album.price}</li>
                <li>Quantity: {this.props.album.quantity}</li>
              </ul>
            </li>
              <li className="list-group-item"><h3>Categories</h3>
                <ul>
                  { this.props.album.categories && this.props.album.categories.map( (cat) => {
                     return <li key={cat.id}>{cat.name}</li>;
                  })
                  }
                </ul>
              </li>
              <li className="list-group-item"><h4>Reviews</h4></li>
            </ul>
          </div>
    </div>);
  }
}
