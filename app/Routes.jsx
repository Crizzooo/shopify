import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from './store';

//React Components
import Layout from './Layout';
import LoginPage from './components/LoginPage';

import {fetchProducts, testDispatcher} from './reducers/products';

/* -----------------    COMPONENT     ------------------ */

// const Routes = ({ fetchInitialData, runTestDispatch }) =>
//    (
//   <Router history={browserHistory}>
//     <Route path="/" component={Layout} onEnter={runTestDispatch}>
//       <Route path="login" component={LoginPage} />
//     </Route>
//   </Router>
// );

class Routes extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout} onEnter={this.props.runTestDispatch}>
        </Route>
      </Router>
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapProps = state => {
  return {
    message: state.message
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

export default connect(mapProps, mapDispatch)(Routes);
