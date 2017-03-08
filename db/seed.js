'use strict'; // eslint-disable-line semi

const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {firstName: 'so', lastName: 'many', email: 'god@example.com', password: '1234'},
  {firstName: 'Barack', lastName: 'Obama', email: 'barack@example.gov', password: '1234'},
  {firstName: 'dwight', lastName: 'einsenhower', email: 'hello@email.com', password: '1234'},
  {firstName: 'john', lastName: 'kennedy', email: '123@email.com', password: '1234'},
  {firstName: 'george', lastName: 'bush', email: '1234@email.com', password: '1234'},
  {firstName: 'alexander', lastName: 'hamilton', email: '12345@email.com', password: '1234'},
  {firstName: 'george', lastName: 'washington', email: '123456@email.com', password: '1234'},
  {firstName: 'thomas', lastName: 'jefferson', email: '1234567@email.com', password: '1234'},
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

/*
Requested Albums
Nirvana - Nevermind
Darude -
Animal Collective - Spirity They've Gone Spirit They've Vanished
Beach House - Bloom
The Magnetic Fields - 69 Love Songs
Yoshimi Battles the Pink Robots - The Flaming Lips
Phish - Billy breahtes
The National - High Violet
Sigur Ros - Takk
Rick Astley - Whenever you need somebody
Mercury Rev - Yer SElf is Steam
Lucius - Wildewoman
Blink 182 - Enema of the state
California honeydrops - honeydrops live
Abraxas - Santana
2pac - all eyez on me
sugar ray - 14:52
*/
const seedProducts = () => db.Promise.map([
  {title: 'Nirvana - Nevermind', description: 'great album, you should buy it!', imageURL: 'https://i0.wp.com/www.rockandrollgps.com/wp-content/uploads/2014/06/Nirvana-Nevermind-Album-Cover.jpg', price: 19.99, inventory: 5, product_type: 'album'},
  {title: '69 Love Songs - The Magnetic Fields', description: 'decent album, you shouldn\'t buy it!', imageURL: 'http://cdn4.pitchfork.com/albums/4977/homepage_large.a2ede6ae.jpg', price: 19.99, inventory: 5, product_type: 'album'},
  {title: 'Beach House - Bloom', description: 'best album ever', imageURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Beach_House_-_Bloom.png/220px-Beach_House_-_Bloom.png', price: 9.95, inventory: 10, product_type: 'album'},
  {title: 'Nirvana - Logo T-Shirt', description: 'support your favorite band with their classic Tee', imageURL: 'http://www.teevault.com/vault/img/tees/img/o4/nirvana_smile_az_t_shirt.jpg', price: 4.95, inventory: 10, product_type: 'clothing'},
  {title: 'Blink 182 - Enema of the State', description: 'throwback to your punk rock high school days', imageURL: 'https://i.scdn.co/image/13f894c1300cbdda027ff948ee963640c5126d29', price: 4.95, inventory: 10, product_type: 'album'},
  {title: 'The Beatles - Abbey Road', description: 'you know you want to recreate this album pic', imageURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Beatles_-_Abbey_Road.jpg/220px-Beatles_-_Abbey_Road.jpg', price: 4.95, inventory: 10, product_type: 'album'},
  {title: 'Blink 182 - The Rebel Tee', description: 'X )', imageURL: 'http://images.sportsdirect.com/images/imgzoom/59/59490403_xxl.jpg', price: 4.95, inventory: 10, product_type: 'clothing'},
  {title: 'Notorious B.I.G - Ready to Die', description: 'the rap classic', imageURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Ready_To_Die.jpg/220px-Ready_To_Die.jpg', price: 4.95, inventory: 10, product_type: 'album'}

], product => db.model('products').create(product))

const seedCategories = () => db.Promise.map([
  {name: 'Featured'},
  {name: 'Trending'},
  {name: 'On Sale'}
], category => db.model('category').create(category))

const seedCartItems = () => db.Promise.map([], cartItem => db.model('cartItems').create(cartItem))

const seedAlbums = () => db.Promise.map([
  {name: 'Nevermind', genre: 'Rock', year: 1990, artist_id: 1, product_id: 1},
  {name: '69 Love Songs', genre: 'Ambient', year: 1999, artist_id: 2, product_id: 2},
  {name: 'Bloom', genre: 'Dream pop', year: 2012, artist_id: 3, product_id: 3},
  {name: 'Enema of the State', genre: 'Punk Rock', year: 1999, artist_id: 4, product_id: 5},
  {name: 'Abbey Road', genre: 'Rock', year: 1969, artist_id: 5, product_id: 6},
  {name: 'Ready to Die', genre: 'Rap', year: 1994 , artist_id: 6 , product_id: 8}
], album => db.model('albums').create(album))

const seedArtists = () => db.Promise.map([
  {name: 'Nirvana', imageURL: 'http://images.gibson.com/Lifestyle/2014/grunge/nirvana.jpg'},
  {name: 'The Magnetic Fields', imageURL: 'https://img.discogs.com/KqXLMw6kFwGExba7sqlh_wdAUPY=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-41095-1113002604.jpg.jpg'},
  {name: 'Beach House', imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Beach_House_Roundhouse_2012.jpg/300px-Beach_House_Roundhouse_2012.jpg'},
  {name: 'Blink 182', imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Blink-182%2C_June_2016.jpg/300px-Blink-182%2C_June_2016.jpg'},
  {name: 'The Beatles', imageURL:
'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg'},
  {name: 'Notorious B.I.G', imageURL: 'https://yt3.ggpht.com/-yeICFnx3XmA/AAAAAAAAAAI/AAAAAAAAAAA/JnC-j_viFgA/s900-c-k-no-mo-rj-c0xffffff/photo.jpg'}
], artist => db.model('artists').create(artist))

const seedClothing = () => db.Promise.map([
  {type: 'tshirt', size: 'S', artist_id: 1, product_id: 4},
  {type: 'tshirt', size: 'one-size', artist_id: 4, product_id: 7},
], clothing => db.model('clothing').create(clothing))


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
  .catch(error => console.error(error))
  .finally(() => db.close())
