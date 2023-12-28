// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require user controller
const userCtrl = require('../controllers/user');
router.use(express.json());


router.post('/update', userCtrl.user_update_put);
router.get('/profile', userCtrl.user_show_get);
router.get('/adminUsers', userCtrl.admin_users_get);


module.exports = router;