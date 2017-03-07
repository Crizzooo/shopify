import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Albums from './Albums';
import Clothing from './Clothing';

import store from '../reducers';

import {fetchFilteredProducts, filterCategories} from '../reducers/products';


class FilteredProductContainer extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    console.log('rendering filtered products page with props:', this.props);
    console.log('THIS PROPS FILTER CATEGORY:', this.props.filterCategory);
    return (
      <div>
        <div className="row">
          <div className="btn-group btn-group-lg filterButtons" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary" onClick={() => browserHistory.push('/')}>All Categories</button>
              { this.props.categories && this.props.categories.map( (categoryObj) => {
                 return (categoryObj.id === this.props.filterCategory) ?
                  <button key={categoryObj.id} type="button" className="btn btn-secondary active"
                  onClick={() => this.props.fetchFilteredProducts(categoryObj.name, categoryObj.id)}>{categoryObj.name}</button>
                  :
                  <button key={categoryObj.id} type="button" className="btn btn-secondary"
                  onClick={() => this.props.fetchFilteredProducts(categoryObj.name, categoryObj.id)}>{categoryObj.name}</button>
              })}
          </div>
        </div>
        <Albums albums={this.props.filteredAlbums} />
        <Clothing clothing={this.props.filteredClothing} />
      </div>
    )
  }

}

const mapProps = state => {
  console.log('Mapping Props from state for Filtered Products Page', state);
  return {
    message: state.products.message,
    clothing: state.products.clothing,
    albums: state.products.albums,
    filteredAlbums: state.products.filteredProducts.albums,
    filteredClothing: state.products.filteredProducts.clothing,
    categories: state.products.categories,
    filterCategory: state.products.currentCategoryFilter
  };
};

const mapDispatch = {
  fetchFilteredProducts
}

export default connect(mapProps, mapDispatch)(FilteredProductContainer);
