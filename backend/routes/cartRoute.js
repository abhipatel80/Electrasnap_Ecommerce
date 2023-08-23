const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { auth } = require('../middleware/auth');

router.post('/cart', auth, cartController.addcart);
router.get('/cart', auth, cartController.getcart);
router.delete('/cart/:id', auth, cartController.deletecart);
router.put('/cart/:id', auth, cartController.editcart);

module.exports = router;
