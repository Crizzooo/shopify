import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_PRODUCTS';
const TEST       = 'TEST_CASE';


/* ------------   ACTION CREATORS     ------------------ */

const init   = products => ({ type: INITIALIZE, products });
const test   = msg => ({ type: TEST, message: msg })

/* ------------       REDUCERS     ------------------ */

const initialState = {
  products: [],
  message: ''
}

export default ( state = initialState, action) => {
  console.log('Current Reducer State', state);
  console.log('Reducer has been called with this action obj:', action);
  const newState = Object.assign({}, state);

  switch (action.type) {

    //We might want a newState const here

    case INITIALIZE:
      newState.products = action.products;
      return newState;

    case TEST:
      console.log('this is a test case', action.message);
      newState.message = action.message;
      return newState;

    default:
      return newState;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
       .then( (res) => {
         console.log('\n\n\nfetchProducts is dispatching with these resulting products:\n\n\n', res);
         dispatch(init(res))
       })
       .catch(err => console.error('Fetching products unsuccessful', err))
};

export const testDispatcher = (msg) => dispatch => {
  dispatch(test(msg));
}
