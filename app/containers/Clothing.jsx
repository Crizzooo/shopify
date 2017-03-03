import React, { Component } from 'react';
import { connect } from 'react-redux';
import Album from '../components/Album';

import ClothingItem from '../components/ClothingItem';

class ClothingContainer extends Component {
  // componentDidMount() {
  // }
  constructor(props) {
    super(props);
    console.log('\n\n CLOTHING COMPONENT', props);
  }


  render() {
    return (
      <div>
        <div className="flexContainer">
          {
            this.props.clothing && this.props.clothing.map(clothing => (
              <ClothingItem clothing={clothing} key={clothing.id} />
            ))
          }
        </div>
      </div>
    )
  }

}

const mapProps = state => {
  console.log('Mapping Props from state', state);
  return {
    message: state.products.message,
    clothing: state.products.products.clothing
  };
};

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    // what other data might we want to fetch on app load?
  }
});

export default connect(mapProps, mapDispatch)(ClothingContainer);
