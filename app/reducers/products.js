import axios from 'axios';
const normalize = require('normalizr').normalize;
const schema = require('normalizr').schema;
const R = require('ramda');

import { browserHistory } from 'react-router';

/* -----------------    ACTIONS     ------------------ */

const TEST          = 'TEST_CASE';
const LOAD_ALBUMS   = 'LOAD_ALBUMS';
const LOAD_CLOTHING = 'LOAD_CLOTHING';
const LOAD_CURRENT_PRODUCT = 'LOAD_CURRENT_PRODUCT';
const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
const LOAD_FILTERED_ALBUMS = 'LOAD_FILTERED_ALBUMS';
const LOAD_FILTERED_CLOTHING = 'LOAD_FILTERED_CLOTHING';
const FILTER_CATEGORIES = 'FILTER_CATEGORIES';
const FILTER_PRODUCTS = 'FILTER_PRODUCTS';


/* ------------   ACTION CREATORS     ------------------ */

const test         = msg => ({ type: TEST, message: msg })
const loadAlbums   = albums => ({ type: LOAD_ALBUMS, albums });
const loadClothing = clothing => ({ type: LOAD_CLOTHING, clothing});
const loadCurrentProduct = product => ({ type: LOAD_CURRENT_PRODUCT, product });
const loadCategories = categories => ({ type: LOAD_CATEGORIES, categories });
export const filterCategories = categoryId => ({ type: FILTER_CATEGORIES, categoryId});
const filterProducts = filteredProductObj => ({
  type: FILTER_PRODUCTS,
  filtered: filteredProductObj
})
const loadFilteredAlbums = filteredAlbums => ({ type: LOAD_FILTERED_ALBUMS, filteredAlbums });
const loadFilteredClothing = filteredClothing => ({ type: LOAD_FILTERED_CLOTHING, filteredClothing });

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
  message: '',
  filteredProducts: {
    albums: [],
    clothing: []
  },
  categories: [],
  currentCategoryFilter: null
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

    case LOAD_FILTERED_ALBUMS:
      console.log("reducer receives filtered albums", action.filteredAlbums);
      console.log('Current Reducer filter category is:', newState.currentCategoryFilter);
      newState.filteredProducts.albums = action.filteredAlbums;
      return newState;

    case LOAD_FILTERED_CLOTHING:
      console.log('reducer recieves filtered clothing', action.filteredClothing);
      return newState;

    case FILTER_PRODUCTS:
      console.log('reducer recieves action for filtering products ', action.filtered);
      newState.filteredProducts.albums = action.filtered.albums;
      newState.filteredProducts.clothing = action.filtered.clothing;
      return newState;

    case LOAD_CATEGORIES:
      console.log('reducer receives category data', action.categories);
      newState.categories = action.categories;
      return newState;

    case FILTER_CATEGORIES:
      console.log('Setting current filtered categories to', action.categoryId);
      newState.currentCategoryFilter = action.categoryId;
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

export const fetchAlbums = (catId) => dispatch => {
  axios.get('/api/products/albums')
  .then( (res) => {
    var albumsArr = res.data;
    console.log('\n\n Fetch Albums received: ', res.data);
    if (catId) {
      albumsArr = albumsArr.filter( (album) => {
        return R.none( (category) =>
           category.id === catId
      , album.product.categories);
      })
    }
    dispatch(loadAlbums(albumsArr));
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

/* Normalize Schemas For Fetchers involving all products */
const category = new schema.Entity('category');
const product = new schema.Entity('products', {
  categories: [ category ]
});
const album = new schema.Entity('albums', {
  product: [ product ],
  artist: artist
})

const clothing = new schema.Entity('clothings', {
  artist: artist
})
const albumForFilter = new schema.Entity('albums', {
  artist: artist
})
const productForFilter = new schema.Entity('products, ', {
  categories: [ category ],
  albums: [ album ],
  clothings: [ clothing ]
})
const artist = new schema.Entity('artist');

//Schemas
const productsSchemaForGettingCategories = [ product ];
const albumSchema = [ album ];
const schemaForFilteringProducts = [ productForFilter ]

export const setFilterCategory = (categoryId) => dispatch => {
  console.log('setting category id as current filter: ', categoryId);
  dispatch(filterCategories(categoryId));
  browserHistory.push('/products/filtered');
}

export const fetchFilteredProducts = (categoryName, categoryId) => dispatch => {
  dispatch(filterCategories(categoryId));
  console.log('filtering product by: ', categoryName, categoryId);
  let filteredAlbums, filteredClothing;
  axios.get(`/api/products/albums`)
  .then( (albumsRaw) => {
    const albums = albumsRaw.data;
    console.log("RAW DATA", albums);

    filteredAlbums = albums.filter( (album) => {
      return R.none( (category) => {
        return category.id === categoryId;
      }, album.product.categories);
    })

    console.log('FILTERED DATA', filteredAlbums);
    return axios.get(`/api/products/clothing`)
    //TODO: Write a function to manually filter the raw data
    //TODO: Or, write a function to pull in album and clothing data and filter those based on category
  })
  .then( (clothingRaw) => {
    const clothing = clothingRaw.data;
    console.log('CHECK MY SWAG', clothing);
    filteredClothing = clothing.filter( (clothingObj) => {
      return R.none( (category) => {
        return category.id === categoryId;
      }, clothingObj.product.categories)
    })
  })
  .then( () => {
      const filteredProductsObj = {
        albums: filteredAlbums,
        clothing: filteredClothing
      };
      dispatch(filterProducts(filteredProductsObj));
      browserHistory.push('/products/filtered');
  })
  .catch(console.err);
}
/*
export const fetchFilterAlbums = () => dispatch => {
  axios.get('/api/products/albums')
  .then( (res) => {
    console.log('\n\n Fetch Products received: ', res.data);
    const normalizedAlbums = normalize(res.data, albumSchema);
    console.log('normalized album data: ', normalizedAlbums);
    // const albumsToReturn = normalizedAlbums.filter
    dispatch(loadFilteredAlbums(normalizedAlbums));
  })
  .catch(err => console.error('Fetching filtered albums unsuccessful', err));
}

export const fetchFilterClothing = () => dispatch => {
  axios.get('/api/products/clothing')
  .then( (res) => {
    console.log('\n\n Fetch Clothing received: ', res.data);
    dispatch(loadClothing(res.data));
  })
  .catch(err => console.error('Fetching albums unsuccessful', err));
}
*/
export const fetchCategories = () => dispatch => {
  console.log('Fetching Categories!');
  axios.get(`/api/products`)
  .then( (products) => {
    const normalizedProducts = normalize(products.data, productsSchemaForGettingCategories);
    const categories = [];
    let pushToCategories = Array.prototype.push.bind(categories);
    const pushOneToCategory = R.unary(pushToCategories);
    R.forEachObjIndexed(pushOneToCategory, normalizedProducts.entities.category);
    dispatch(loadCategories(categories));
  })
  .catch(err => console.error('Fetching Categories Failed!', err));
}

export const filterBySearch = (inputValue) => dispatch => {
  inputValue = inputValue.toLowerCase();
  dispatch(filterCategories(null));
  console.log('filtering by Search Val:', inputValue);
  //Get Albums
      //Filter by each property including search text
  let filteredAlbums, filteredClothing;
  axios.get(`/api/products/albums`)
  .then( (albumsRaw) => {
    const albums = albumsRaw.data;
    console.log("RAW DATA", albums);

    filteredAlbums = albums.filter( (album) => {
      return R.any( (prop) => {
        console.log('PROP IN SEARCH', prop, typeof prop);
        if (typeof prop === 'string'){
          prop = prop.toLowerCase();
          return prop.includes(inputValue);
        } else if (typeof prop === 'number'){
          return prop === parseInt(inputValue);
        } else {
          return false;
        }
      }, [album.name, album.genre, album.year, album.artist.name])
    });
    return axios.get(`/api/products/clothing`)
  })
  .then( (clothingRaw) => {
    const clothingArr = clothingRaw.data;
    console.log("RAW DATA", clothing);

    filteredClothing = clothingArr.filter( (clothingItem) => {
      return R.any( (prop) => {
        console.log('PROP IN SEARCH', prop, typeof prop);
        if (typeof prop === 'string'){
          prop = prop.toLowerCase();
          return prop.includes(inputValue);
        } else if (typeof prop === 'number'){
          return prop === parseInt(inputValue);
        } else {
          return false;
        }
      }, [clothingItem.type, clothingItem.size, clothingItem.artist.name] )});

    const filteredProductsObj = {
      albums: filteredAlbums,
      clothing: filteredClothing
    }

    dispatch(filterProducts(filteredProductsObj));
    browserHistory.push('/products/filtered');

  })
  .catch(console.log);
  }


/* ---------- Helper methods for Actions ---------- */
// const normalizedProducts = normalize(products.data, schemaForFilteringProducts);
/*
console.log('normalized products:', normalizedProducts);
const productsArr = [];
let pushToProducts = Array.prototype.push.bind(productsArr);
const pushOneToProduct = R.unary(pushToProducts);
R.forEachObjIndexed(pushOneToProduct, normalizedProducts.entities.products);
console.log('productsArr:', productsArr);
const filteredProducts = productsArr.filter( (productObj) => {
  console.log('filtering product: ', productObj);
  return R.contains(categoryId, productObj.categories);
})
console.log('filtered products:', filteredProducts);
dispatch(filterProducts(filteredProducts)); */

function productCategoryHasFilteredId(product, catId){
  return product.id === catId;
}
