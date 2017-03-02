import React, { Component } from 'react'

export default class Album extends Component {
  // componentDidMount() {
  // }

  render() {
    return (
      <div>
        <h1>ALBUMS</h1>
          <div className="card">
            <img className="card-img-top" src="http://www.designformusic.com/wp-content/uploads/2015/10/insurgency-digital-album-cover-design.jpg" alt="Card image cap"></img>
            <div className="card-block">
              <h2 className="card-title albumName">Insurgency</h2>
              <span className="productPrice">$19.99</span>
              <h5 className="card-subtitle mb-2 text-muted albumArtist"><i>The Rebels, 1997</i></h5>
              <br></br>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
      </div>
    )
  }
}
