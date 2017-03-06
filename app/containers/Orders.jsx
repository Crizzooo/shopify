import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Orders extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>All orders listed here</p>
        {/* <Albums albums={this.props.albums} /> */}
      </div>
    )
  }

}
