import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ClothingItem extends Component {

  render() {
    const clothing = this.props.clothing;
    console.log("rendering clothing with props", this.props);
    console.log('product: ', clothing.product);
    if (clothing.product) {
      return (
        <div className="card smallCard flexBox">
            <div className="cardImgHolder">
              <img className="card-img-top smallCardImage" src="http://www.designformusic.com/wp-content/uploads/2015/10/insurgency-digital-album-cover-design.jpg" alt="Card image cap" />
              <div className="cardOverlay">
                <div className="cardControls">
                  <ul className="cardControlButtons">
                    <li className="cardListItem">
                       Add To Cart
                    </li>
                    <span>  ||  </span>
                    <li className="cardListItem">
                       Play
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-block smallCardBlock">
              <Link to={`/product/${clothing.product.id}`}>
              <h2 className="card-title albumName">{clothing.product.title}</h2>
              </Link>
              <span className="productPrice">{clothing.product.price}</span>
              <h5 className="card-subtitle mb-2 text-muted albumArtist">{clothing.artist.name}</h5>
              <br />
              <p className="card-text">{clothing.product.description}</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
      );
    } else {
      //Render Placeholder Albums
      return (
        <div>
          <div className="card">
            <img className="card-img-top" src="http://www.designformusic.com/wp-content/uploads/2015/10/insurgency-digital-album-cover-design.jpg" alt="Card image cap" />
            <div className="card-block">
              <h2 className="card-title albumName">TEMP ALBUM NAME</h2>
              <span className="productPrice">$100</span>
              <h5 className="card-subtitle mb-2 text-muted albumArtist"><i>TEMP ARTIST, 1997</i></h5>
              <br />
              <p className="card-text">Temp Desc.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      );
    }
  }
}
