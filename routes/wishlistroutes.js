const express = require('express');
const wishlistcontroller = require('../controllers/wishlistcontroller');
const router = express.Router();
const authVerify = require('../middleware/authVerify')

router.get('/wishlist/(:userid)', authVerify, wishlistcontroller.wishlist);
router.get('/singlewish/(:id)', authVerify, wishlistcontroller.singlewish);
router.get('/findwish/(:category)', authVerify, wishlistcontroller.findwish);
router.post('/addwish', authVerify, wishlistcontroller.addwish);
router.delete('/deletewish/(:id)', authVerify, wishlistcontroller.deletewish);
router.put('/updatewish/(:id)', authVerify, wishlistcontroller.updatewish);
module.exports = router