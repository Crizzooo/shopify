import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FilterInput from '../components/filterInput'
import Login from '../components/Login'
import {login} from 'APP/app/reducers/auth'

class Layout extends Component {

  constructor(props) {
    super(props);
  }


  render () {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <div id="navcontainer" className="container">

            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>

            <a className="navbar-brand" id="logo" href="#">Final Vinyl</a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to='/products' id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Products
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <Link className="dropdown-item" to='/products'>All Products</Link>
                          <Link className="dropdown-item" to='/albums'>Albums</Link>
                          <Link className="dropdown-item" to='/clothing'>Clothing</Link>
                        </div>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/cart'>Cart</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/signup'>Signup</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/login'>Login</Link>
                </li>
              </ul>

              <FilterInput />

            </div>

          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          </div>
        </nav>
        <div className="bodyBackground">
               <div className="bodyOverlay">

                 <div className="container content">
                   { this.props.children }
                 </div>

                 <hr />

                 <div id="footer" className="container">
                   FINYL VINYL | 5 Hanover Square 11th Fl. New York, NY. 10022 | 212.333.4444
                 </div>
               </div>
         </div>
      </div>
    );
  }
}

const mapProps = state => {
  console.log('Mapping Props from ', state);
  return {
    message: state.products.message,
    albums: state.products.products.albums
  };
};

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchProducts());
    // what other data might we want to fetch on app load?
  },
  runTestDispatch: () => {
    dispatch(testDispatcher('hi, test msg!'))
  }
});

//removed onEnter={fetchInitialData} from '/' path

// removed   <IndexRoute component={Layout} />

export default connect(mapProps, mapDispatch)(Layout);
