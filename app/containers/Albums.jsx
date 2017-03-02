import React, { Component } from 'react';
import Album from '../components/Album';

export default class Albums extends Component {
  // componentDidMount() {
  // }
  constructor(props) {
    super(props);
    console.log('\n\n\nALBUM COMPONENT', props);
  }

  render() {
    console.log('rendering albums!');
    return (
      <div>
        <h1>ALBUMS</h1>
          {
            this.props.albums && this.props.albums.map(album => (
              <Album album={album} key={album.id} />
            ))
          }
      </div>
    )
  }
}


// render() {
//   return (
//     <div>
//       <h1>ALBUMS</h1>
        // {
        //   this.props.albums.map(album => (
        //     <Album album={album} key={album.id} />
        //   ))
        // }
//     </div>
//   )
// }
