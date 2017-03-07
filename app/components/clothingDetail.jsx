import React, { Component } from 'react';
import { Link } from 'react-router';

export default class albumDetail extends Component {
  constructor(props) {
    super(props);
    console.log('Clothing Detail props:', props);
  }
  render() {
    return (
      <div className="card singleProdCard">
        <img className="card-img-top productImage" src={this.props.clothing.imageURL} alt="Card image cap" />
        <div className="card-block">
          <h1>{this.props.clothing.title}</h1>
          <span><i>{this.props.clothing.desc}</i></span>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
              <h3>Details</h3>
              <ul>
                <li>Article: {this.props.clothing.clothings[0].type}</li>
                <li>Size: {this.props.clothing.clothings[0].size}</li>
                <li>Price: ${this.props.clothing.price}</li>
                <li>Quantity: {this.props.clothing.inventory}</li>
              </ul>
            </li>
              <li className="list-group-item"><h3>Categories</h3>
                <ul>
                  { this.props.clothing.categories && this.props.clothing.categories.map( (cat) => {
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
