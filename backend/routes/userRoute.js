const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, authorizeRoles } = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

router.post('/password/forget', userController.forgetpassword);
router.put('/password/reset/:token', userController.resetpassword);

router.get('/me', auth, userController.getuserdetails);
router.put('/password/update', auth, userController.updatepassword);
router.put('/me/update', auth, userController.updateprofile);
router.get('/user', auth, userController.getalluserdetails);

router.get('/admin/users', auth, authorizeRoles("seller"), userController.getallusers);
router.put('/admin/user/:id', auth, authorizeRoles("seller"), userController.adminupdateprofile);
router.delete('/admin/user/:id', auth, authorizeRoles("seller"), userController.admindeleteuser);

module.exports = router;
