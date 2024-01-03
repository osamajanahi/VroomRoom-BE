// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require user controller
const userCtrl = require('../controllers/user');
const upload = require('../config/multerConfig');
router.use(express.json());


router.post('/update', upload.single('image'), userCtrl.user_update_post);
router.get('/profile', userCtrl.user_show_get);
router.get('/adminUsers', userCtrl.admin_users_get);
router.post('/adminUpdate', userCtrl.user_update_post);
router.get('/adminDelete', userCtrl.admin_delete_get);
router.get('/userType', userCtrl.user_type_get);


module.exports = router;