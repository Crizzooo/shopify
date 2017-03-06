import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const LOAD_CART = 'LOAD_CART';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'


/* ------------   ACTION CREATORS     ------------------ */


const loadCart = cartItems =>  ({type: LOAD_CART, cartItems})

const deleteItem = prodId => ({type: DELETE_CART_ITEM, prodId})

/* ------------       REDUCERS     ------------------ */

const initialState = {}

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {

    case LOAD_CART:
      newState.cartItems = action.cartItems;
      return newState;

    case DELETE_CART_ITEM:

      newState.cartItems = newState.cartItems.filter(item => item.product_id !== parseInt(action.prodId, 10))
      return newState

    default:
      return newState;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchCart = (userId) => dispatch => {
  axios.get(`/api/cartItems/${userId}`)
    .then(res => res.data)
    .then(cartItems => {
      dispatch(loadCart(cartItems))
    })
    .catch(err => console.error('Fetching cart items unsuccessful', err));
}

export const deleteCartItem = (prodId) => dispatch => {
  prodId = +prodId
  dispatch(deleteItem(prodId))
  axios.delete(`/api/cartItems/${prodId}`)
    .catch(err => console.error(`deleting item ${prodId} unsuccessful`, err))
    }
