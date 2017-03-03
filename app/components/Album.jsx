import React, { Component } from 'react'

export default class Album extends Component {
  // componentDidMount() {
  // }

  render() {
    const album = this.props.album;
    console.log("rendering album with props", this.props);
    console.log('product: ', album.product);
    if (album.product) {
      //switch img to point to album.imageURL.data
      return (
        <div className="card flexBox">
          <div className="cardImgHolder">
            <img className="card-img-top" src="http://www.designformusic.com/wp-content/uploads/2015/10/insurgency-digital-album-cover-design.jpg" alt="Card image cap" />
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
          <div className="card-block">
            <h2 className="card-title albumName">{album.name}</h2>
            <span className="productPrice">{album.product.price}</span>
            <h5 className="card-subtitle mb-2 text-muted albumArtist">{album.artist.name}, <i>{album.year}</i></h5>
            <br />
            <p className="card-text">{album.product.description}</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      );
    } else {
      //Render Placeholder Albums
      return (
        <div>
          <div className="card">
            <div>
              <img className="card-img-top" src="http://www.designformusic.com/wp-content/uploads/2015/10/insurgency-digital-album-cover-design.jpg" alt="Card image cap" />
              <div className="cardControls"></div>
            </div>
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
