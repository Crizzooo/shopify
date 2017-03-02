import React, { Component } from 'react';
import Album from './Album';

export default class Album extends Component {
  // componentDidMount() {
  // }
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <div>
        <h1>ALBUMS</h1>
          {
            this.props.albums.map(album => (
              <Album album={album} key={album.id} />
            ))
          }
      </div>
    )
  }
}
