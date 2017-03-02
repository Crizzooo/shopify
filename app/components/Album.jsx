import React, { Component } from 'react'

export default class Album extends Component {
  // componentDidMount() {
  // }

  render() {
    const album = this.props.album;
    console.log("rendering album with props", this.props);
    console.log('album: ', this.props.album);
    return (
      <div>
          <div className="card">
            <img className="card-img-top" src="http://www.designformusic.com/wp-content/uploads/2015/10/insurgency-digital-album-cover-design.jpg" alt="Card image cap" />
            <div className="card-block">
              <h2 className="card-title albumName">{album.name}</h2>
              <span className="productPrice">{album.price}</span>
              <h5 className="card-subtitle mb-2 text-muted albumArtist"><i>The Rebels, 1997</i></h5>
              <br />
              <p className="card-text">{album.desc}</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
      </div>
    )
  }
}
