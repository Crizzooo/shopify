import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Album from './components/Album';

class Layout extends Component {

  constructor(props) {
    super(props);
    console.log('In Layout props', this.props);
  }

  render () {
    console.log('layout render', this.props)
    return (
      <div>
        <div className="navbar navbar-fixed-top navbar-inverse" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#nav-items">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">FINYL VINYL</Link>
            </div>
            <div id="nav-items" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="">index</a></li>
                <li><Link to="/">products</Link></li>
                <li><a href="">users</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container content">
          { this.props.children }
        </div>
        <hr />
        <div id="footer" className="container text-muted">
          FINYL VINYL
        </div>
        <Album message={this.props.message}/>
      </div>
    );
  }
}

const mapProps = state => {
  console.log('Mapping Props from ', state);
  return {
    message: state.products.message
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
