'use strict'; // eslint-disable-line semi

const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {firstName: 'so', lastName: 'many', email: 'god@example.com', password: '1234'},
  {firstName: 'Barack', lastName: 'Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

const seedAddresses = () => db.Promise.map([
  {buildingNumber: '1234 23rd Street', city: 'New York', state: 'NY', zip: '12345', user_id: 1},
  {buildingNumber: '5432 85th Place', city: 'Seattle', state: 'WA', zip: '54321', user_id: 2},
], address => db.model('addresses').create(address))

const seedOrders = () => db.Promise.map([
  {status: 'Created', isActive: true, items: [1, 3, 4], user_id: 1},
  {status: 'Processing', isActive: true, items: [1, 2], user_id: 2},
], order => db.model('orders').create(order))

const seedReviews = () => db.Promise.map([
  {rating: 3, title: 'Good but not really', body: 'This product is top notch! BUY IT NOW', user_id: 1, product_id: 1},
  {rating: '5', title: 'DOPE SHIRT', body: 'sick brah', user_id: 2, product_id: 2},
], review => db.model('reviews').create(review))

const seedProducts = () => db.Promise.map([
  {title: 'Some album', description: 'great album, you should buy it!', imageURL: 'http://geantav.hol.es/wogypyb.png', price: 19.99, quantity: 5, product_type: 'album'},
  {title: 'Another album', description: 'decent album, you shouldn\'t buy it!', imageURL: 'http://geantav.hol.es/wogypyb.png', price: 19.99, quantity: 5, product_type: 'album'},
  {title: 'Awesome T-Shirt', description: 't-shirt description here', imageURL: 'http://geantav.hol.es/wogypyb.png', price: 9.95, quantity: 10, product_type: 'clothing'},
  {title: 'Sick trucker hat', description: 'wear this hat to the beach', imageURL: 'http://geantav.hol.es/wogypyb.png', price: 4.95, quantity: 10, product_type: 'clothing'},
  {title: 'Generic Rock Album', description: 'wear this hat to the beach', imageURL: 'http://geantav.hol.es/wogypyb.png', price: 4.95, quantity: 10, product_type: 'album'},
  {title: 'Another Rock Album', description: 'wear this hat to the beach', imageURL: 'http://geantav.hol.es/wogypyb.png', price: 4.95, quantity: 10, product_type: 'album'}
], product => db.model('products').create(product))

const seedCategories = () => db.Promise.map([
  {name: 'Featured'},
  {name: 'Trending'},
  {name: 'On Sale'}
], category => db.model('category').create(category))

const seedCartItems = () => db.Promise.map([
  {product_id: 1, order_id: 1},
  {product_id: 2, order_id: 1},
  {product_id: 3, order_id: 1},
  {product_id: 3, order_id: 2},
  {product_id: 4, order_id: 2},
], cartItem => db.model('cartItems').create(cartItem))

const seedAlbums = () => db.Promise.map([
  {name: 'Zenith', genre: 'instrumental', year: 1995, artist_id: 1, product_id: 1},
  {name: 'Ghosts I-IV', genre: 'ambient', year: 2010, artist_id: 2, product_id: 2},
  {name: 'ROCK ALBUM', genre: 'rock', year: 2010, artist_id: 2, product_id: 5},
  {name: 'MORE ROCK', genre: 'rock', year: 2010, artist_id: 2, product_id: 6}
], album => db.model('albums').create(album))

const seedArtists = () => db.Promise.map([
  {name: 'Dexter Britain', imageURL: 'www.something.com'},
  {name: 'Nine Inch Nails', imageURL: 'www.anotherone.com'},
], artist => db.model('artists').create(artist))

const seedClothing = () => db.Promise.map([
  {type: 'tshirt', size: 'S', artist_id: 1, product_id: 3},
  {type: 'hat', size: 'one-size', artist_id: 2, product_id: 4},
], clothing => db.model('clothing').create(clothing))

const categorySetter = () => db.Promise.map( products, (product) => {
  product.setCategories([1, 2]);
});

let productsToCategorize;

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(seedAddresses)
  .then(seedOrders)
  .then(seedProducts)
  .then(seedCartItems)
  .then(seedReviews)
  .then(seedArtists)
  .then(seedAlbums)
  .then(seedClothing)
  .then(seedCategories)
  .then(() => console.log(`Seeded OK`))
  .then( () => {
    return db.model('products').findAll()
  })
  .then( (products) => {
    productsToCategorize = products;
    return productsToCategorize[0].setCategories([1, 2]);
  })
  .then( () => {
    return productsToCategorize[1].setCategories([2, 3]);
  })
  .then( () => {
    return productsToCategorize[2].setCategories([2, 3]);
  })
  .then( () => {
    return productsToCategorize[5].setCategories([1]);
  })
  .then( () => {
  /*  return db.model('category').findById(2)*/
  })
  .then( (category) => {
    //return category.getProducts();
    db.model('productCategoryPivot').hasMany(db.model('category'));
  })
  .then( (foundProducts) => {
    /*console.log('found Products with category Trending', foundProducts);*/
    return db.model('productCategoryPivot').findAll({
      include: [ db.model('category')/*, db.model('category') */]
      })
  })
  .then( (possibleCategories) => {
    console.log('\n\n\nDid this work?\n\n', possibleCategories);
  })
  .catch(error => console.error(error))
  .finally(() => db.close())
