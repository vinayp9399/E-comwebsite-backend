const express = require('express');
const cartcontroller = require('../controllers/cartcontroller');
const router = express.Router();
router.get('/cartlist/(:userid)',cartcontroller.cartlist);
router.get('/singlecartlist/(:id)',cartcontroller.singlecartlist);
router.get('/findcart/(:category)',cartcontroller.findcart);
router.post('/addcart',cartcontroller.addcart);
router.delete('/deletecart/(:id)',cartcontroller.deletecart);
router.put('/updatecart/(:id)',cartcontroller.updatecart);
module.exports = router