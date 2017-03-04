import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

// const LOAD_ALBUMS = 'LOAD_ALBUMS';
// const TEST       = 'TEST_CASE';
const LOAD_CART = 'LOAD_CART';


/* ------------   ACTION CREATORS     ------------------ */


const loadCart = cartItems =>  ({type: LOAD_CART, cartItems})

/* ------------       REDUCERS     ------------------ */

const initialState = {
  cartItems: [
    {
      id: 1,
      order_id: 1,
      product_id: 2
    },
    {
      id: 2,
      order_id: 1,
      product_id: 1
    },
    {
      id: 3,
      order_id: 2,
      product_id: 3
    }
  ]
}

export default (state = initialState, action) => {
  console.log('Current Cart Reducer State', state);
  console.log('Cart Reducer has been called with this action obj:', action);
  const newState = Object.assign({}, state);

  switch(action.type) {

    case LOAD_CART:
      // newState.cartItems = action.cartItems;
      return newState;

    default:
      return newState;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchCart = () => dispatch => {
  axios.get('/api/cartItems')
    .then(res => res.data)
    .then(cartItems => {
      console.log('found cartItems:', cartItems)
    })
    .catch(err => console.error('Fetching cart items unsuccessful', err));
}
