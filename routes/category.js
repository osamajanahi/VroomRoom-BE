// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require category controller
const categoryCtrl = require('../controllers/category');
router.use(express.json());


router.post('/add', categoryCtrl.category_create_post);
router.get('/index', categoryCtrl.category_index_get);
router.get('/edit', categoryCtrl.category_detail_get);
router.post('/edit', categoryCtrl.category_edit_post);
router.get('/delete', categoryCtrl.category_delete_get);
router.get('/detail', categoryCtrl.category_detail_get);

module.exports = router;