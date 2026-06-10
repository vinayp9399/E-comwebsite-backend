const express = require('express');
const productcontroller = require('../controllers/productcontroller');
const router = express.Router();
const authVerify = require('../middleware/authVerify')

// ── Existing routes (100% unchanged) ─────────────────────────────────────────
router.get('/productlist', authVerify, productcontroller.productlist);
router.get('/singleproductlist/(:id)', authVerify, productcontroller.singleproductlist);
router.get('/findproducts/(:category)', authVerify, productcontroller.findproducts);
router.get('/searchproducts/(:input)', authVerify, productcontroller.searchproducts);
router.get('/sidesearchproducts/', authVerify, productcontroller.sidesearchproducts);
router.post('/addproduct', authVerify, productcontroller.addproduct);
router.delete('/deleteproduct/(:id)', authVerify, productcontroller.deleteproduct);
router.put('/updateproduct/(:id)', authVerify, productcontroller.updateproduct);

// ── NEW: AI smart search (Groq reads products, no schema change) ──────────────
router.get('/aisearch/:query', authVerify, productcontroller.aisearchproducts);

module.exports = router;
