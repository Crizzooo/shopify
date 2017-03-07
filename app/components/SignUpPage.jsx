import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignUpPage extends Component {

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

  render() {

    // This needs to go into the products container and then filteredArtists
    // const inputValue = this.state.inputValue;
    // const filteredArtists = this.props.artists.filter(artist => artist.name.match(inputValue));

    return (
      <form>
            <input
              onChange={this.handleChange}
              id="name"
              type="text"
              className="form-control mr-sm-1"
              placeholder="First Name"

            />
            <input
              onChange={this.handleChange}
              id="name"
              type="text"
              className="form-control mr-sm-1"
              placeholder="Last Name"

            />
            <input
              onChange={this.handleChange}
              id="name"
              type="text"
              className="form-control mr-sm-1"
              placeholder="Email"

            />
            <input
              onChange={this.handleChange}
              id="name"
              type="text"
              className="form-control mr-sm-1"
              placeholder="Password"

            />
            <input
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              value="Submit"
            />
      </form>
    )
  }
}

export default SignUpPage;
