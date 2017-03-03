import React, { Component } from 'react';
import { connect } from 'react-redux';

class FilterInput extends Component {

  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const inputValue = evt.target.value;
    console.log(inputValue);
    this.setState({ inputValue });
  }

  // handleSubmit(evt) {
  //   evt.preventDefault();
  //   store.dispatch(submitSearch(this.state))
  // }

  render() {

    // This needs to go into the products container and then filter
    // const inputValue = this.state.inputValue;
    // const filteredArtists = this.props.artists.filter(artist => artist.name.match(inputValue));

    return (
      <form id="searchform" className="form-inline my-2 my-lg-0">
            <input
              onChange={this.handleChange}
              id="searchbar"
              type="text"
              className="form-control"
              placeholder="Search for..."

            />
            <input
              id="searchbtn"
              className="btn btn-outline-success my-2 my-sm-0" 
              type="submit"
              value="Go!"
            />
      </form>
    )
  }
}

export default FilterInput;
