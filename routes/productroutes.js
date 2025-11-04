const express = require('express');
const productcontroller = require('../controllers/productcontroller');
const router = express.Router();
router.get('/productlist',productcontroller.productlist);
router.get('/singleproductlist/(:id)',productcontroller.singleproductlist);
router.get('/findproducts/(:category)',productcontroller.findproducts);
router.get('/searchproducts/(:input)',productcontroller.searchproducts);
router.post('/addproduct',productcontroller.addproduct);
router.delete('/deleteproduct/(:id)',productcontroller.deleteproduct);
router.put('/updateproduct/(:id)',productcontroller.updateproduct);
module.exports = router