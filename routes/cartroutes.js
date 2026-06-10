const express = require('express');
const cartcontroller = require('../controllers/cartcontroller');
const router = express.Router();
const authVerify = require('../middleware/authVerify')

router.get('/cartlist/(:userid)', authVerify, cartcontroller.cartlist);
router.get('/singlecartlist/(:id)', authVerify, cartcontroller.singlecartlist);
router.get('/findcart/(:category)', authVerify, cartcontroller.findcart);
router.post('/addcart', authVerify, cartcontroller.addcart);
router.delete('/deletecart/(:id)', authVerify, cartcontroller.deletecart);
router.put('/updatecart/(:id)', authVerify, cartcontroller.updatecart);
module.exports = router