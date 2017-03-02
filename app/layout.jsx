import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Layout extends Component {

  render () {
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
      </div>
    );
  }
}