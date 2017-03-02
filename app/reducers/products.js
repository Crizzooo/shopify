import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const LOAD_ALBUMS = 'LOAD_ALBUMS';
const TEST       = 'TEST_CASE';


/* ------------   ACTION CREATORS     ------------------ */

const loadAlbums   = albums => ({ type: LOAD_ALBUMS, albums });
const test   = msg => ({ type: TEST, message: msg })

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
    ]
  },
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
         dispatch(loadAlbums(res.data))
       })
       .catch(err => console.error('Fetching products unsuccessful', err))
};

export const testDispatcher = (msg) => dispatch => {
  dispatch(test(msg));
}

export const fetchAlbums = () => dispatch => {
  axios.get('/api/products/albums')
  .then( (res) => {
    console.log('\n\n Fetch Products received: ', res.data);
    dispatch(loadAlbums(res.data))
  })
  .catch(err => console.error('Fetching albums unsuccessful', err));
}

/* ---------- Helper methods for Actions ---------- */
