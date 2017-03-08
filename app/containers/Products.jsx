import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Albums from './Albums';
import Clothing from './Clothing';

import {fetchFilteredProducts, setFilterCategory} from '../reducers/products';

class ProductContainer extends Component {

  constructor (props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div className="row">
          <div className="btn-group btn-group-lg filterButtons" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary active" onClick={() => browserHistory.push('/')}>All Categories</button>
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
        <Albums albums={this.props.albums} />
        <Clothing clothing={this.props.clothing} />
      </div>
    )
  }

}

const mapProps = state => {

  return {
    message: state.products.message,
    clothing: state.products.products.clothing,
    albums: state.products.products.albums,
    filteredAlbums: state.products.albums,
    filteredClothing: state.products.clothing,
    categories: state.products.categories,
    filterCategory: state.products.currentCategoryFilter
  };
};

const mapDispatch = {
  fetchFilteredProducts,
  setFilterCategory
}

export default connect(mapProps, mapDispatch)(ProductContainer);
