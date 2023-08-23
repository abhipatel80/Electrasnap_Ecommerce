const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, authorizeRoles } = require('../middleware/auth');

router.post('/order/new', auth, orderController.newOrder);

router.get('/order/:id', auth, orderController.getsingleorder);
router.get('/orders/me', auth, orderController.myorders);
router.put('/order/cancel/:id', auth, orderController.cancelorder);

router.get('/admin/orders', auth, authorizeRoles("seller"), orderController.getallorders);
router.put('/admin/order/:id', auth, authorizeRoles("seller"), orderController.updateorderstatus);

module.exports = router;
