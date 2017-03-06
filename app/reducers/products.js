import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const TEST          = 'TEST_CASE';
const LOAD_ALBUMS   = 'LOAD_ALBUMS';
const LOAD_CLOTHING = 'LOAD_CLOTHING';
const LOAD_CURRENT_PRODUCT = 'LOAD_CURRENT_PRODUCT';


/* ------------   ACTION CREATORS     ------------------ */

const test         = msg => ({ type: TEST, message: msg })
const loadAlbums   = albums => ({ type: LOAD_ALBUMS, albums });
const loadClothing = clothing => ({ type: LOAD_CLOTHING, clothing});
const loadCurrentProduct = product => ({ type: LOAD_CURRENT_PRODUCT, product });

/* ------------       REDUCERS     ------------------ */

const initialState = {
  products: {
    albums: [
      { name: 'testAlbum',
        genre: 'instrumental',
        year: 1995,
        desc: 'sample desc',
        id: 1
      },
      { name: 'testAlbum2',
        genre: 'instrumental',
        year: 2000,
        desc: 'sample desc AGAIN',
        id: 2
      }
    ],
    clothing: []
  },
  currentProduct: null,
  message: ''
}

export default ( state = initialState, action) => {
  console.log('Current Reducer State', state);
  console.log('Reducer has been called with this action obj:', action);
  const newState = Object.assign({}, state);

  switch (action.type) {

    case LOAD_ALBUMS:
      newState.products.albums = action.albums;
      return newState;

    case LOAD_CLOTHING:
      newState.products.clothing = action.clothing;
      return newState;

    case LOAD_CURRENT_PRODUCT:
      console.log('reducer receives action for load current');
      newState.currentProduct = action.product;
      return newState;

    default:
      return newState;
  }
}

/* ------------       DISPATCHERS     ------------------ */

// export const fetchProducts = () => dispatch => {
//   axios.get('/api/products')
//    .then( (res) => {
//      console.log('\n\n\nfetchProducts is dispatching with these resulting products:\n\n\n', res);
//      dispatch(loadAlbums(res.data))
//    })
//    .catch(err => console.error('Fetching products unsuccessful', err))
// };

export const fetchAlbums = () => dispatch => {
  axios.get('/api/products/albums')
  .then( (res) => {
    console.log('\n\n Fetch Products received: ', res.data);
    dispatch(loadAlbums(res.data));
  })
  .catch(err => console.error('Fetching albums unsuccessful', err));
}

export const fetchClothing = () => dispatch => {
  axios.get('/api/products/clothing')
  .then( (res) => {
    console.log('\n\n Fetch Clothing received: ', res.data);
    dispatch(loadClothing(res.data));
  })
  .catch(err => console.error('Fetching albums unsuccessful', err));
}

export const fetchCurrentProduct = (id) => dispatch => {
  console.log('Fetching Current Product!');
  axios.get(`/api/products/${id}`)
  .then( (res) => {
    console.log('Got this selected product!', res.data);
    dispatch(loadCurrentProduct(res.data));
  })
  .catch(err => console.error('Fetching current product failed!', err));
}

/* ---------- Helper methods for Actions ---------- */
