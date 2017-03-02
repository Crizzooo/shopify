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
    // this.message = props.message;
    console.log('IN CONSTRUCTOR', this.props)
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route
          path="/" component={Layout}
          onEnter={this.props.runTestDispatch}
          message={this.props.message}
        />
      </Router>
    );
  }
  //
  // render() {
  //   return (
  //     <Router history={browserHistory}>
  //       <Route path="/" component={Layout} onEnter={this.props.runTestDispatch}
  //         message={this.props.message} >
  //         <Route path="login" component={LoginPage} />
  //       </Route>
  //     </Router>
  //   );
  // }
}


/* -----------------    CONTAINER     ------------------ */

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

export default connect(mapProps, mapDispatch)(Routes);
