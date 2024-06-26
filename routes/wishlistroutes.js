const express = require('express');
const wishlistcontroller = require('../controllers/wishlistcontroller');
const router = express.Router();
router.get('/wishlist/(:userid)',wishlistcontroller.wishlist);
router.get('/singlewish/(:id)',wishlistcontroller.singlewish);
router.get('/findwish/(:category)',wishlistcontroller.findwish);
router.post('/addwish',wishlistcontroller.addwish);
router.delete('/deletewish/(:id)',wishlistcontroller.deletewish);
router.put('/updatewish/(:id)',wishlistcontroller.updatewish);
module.exports = router