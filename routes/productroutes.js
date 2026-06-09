const express = require('express');
const productcontroller = require('../controllers/productcontroller');
const router = express.Router();

// ── Existing routes (100% unchanged) ─────────────────────────────────────────
router.get('/productlist',productcontroller.productlist);
router.get('/singleproductlist/(:id)',productcontroller.singleproductlist);
router.get('/findproducts/(:category)',productcontroller.findproducts);
router.get('/searchproducts/(:input)',productcontroller.searchproducts);
router.get('/sidesearchproducts/',productcontroller.sidesearchproducts);
router.post('/addproduct',productcontroller.addproduct);
router.delete('/deleteproduct/(:id)',productcontroller.deleteproduct);
router.put('/updateproduct/(:id)',productcontroller.updateproduct);

// ── NEW: AI smart search (Groq reads products, no schema change) ──────────────
router.get('/aisearch/:query', productcontroller.aisearchproducts);

module.exports = router;
