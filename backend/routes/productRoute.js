const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { auth, authorizeRoles } = require('../middleware/auth');

router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProductDetails);

router.post('/admin/product/new', auth, authorizeRoles("seller"), productController.addProduct);
router.put('/admin/product/:id', auth, authorizeRoles("seller"), productController.editProduct);
router.delete('/admin/product/:id', auth, authorizeRoles("seller"), productController.deleteProduct);

router.put('/review', auth, productController.createproductreview);
router.delete('/reviews', auth, productController.deletereviews);

module.exports = router;
