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
          <div className="container">

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

          <a className="navbar-brand" id="logo" href="#">Final Vinyl </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Products
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#">Albums</a>
                        <a className="dropdown-item" href="#">Artists</a>
                        <a className="dropdown-item" href="#">Merchandise</a>
                      </div>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Checkout</a>
              </li>

              <li className="nav-item">
                <a className="nav-link">Admin Page</a>
              </li>

            </ul>
            <form className="form-inline my-2 my-lg-0"onSubmit={evt => {
              evt.preventDefault()
              login(evt.target.username.value, evt.target.password.value)
            } }>
              <input className="form-control mr-sm-1" placeholder="Username" name="username" />
              <input className="form-control mr-sm-1" placeholder="Password" name="password" type="password" />
              <input className="btn btn-outline-success my-2 my-sm-0" type="submit" value="Login" />
            </form>

          </div>
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
