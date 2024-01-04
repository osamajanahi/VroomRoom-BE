// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require category controller
const categoryCtrl = require('../controllers/category');
// Multer
const upload = require('../config/multerConfig');

router.use(express.json());

// Use upload.single middleware for routes that handle image uploads
router.post('/add', upload.single('image'), categoryCtrl.category_create_post);
router.get('/index', categoryCtrl.category_index_get);

// Use the detail route to get category information for edit
router.get('/detail', categoryCtrl.category_detail_get);
// Use upload.single for editing category, including image update
router.post('/edit/:id', upload.single('image'), categoryCtrl.category_edit_post); 

router.get('/delete', categoryCtrl.category_delete_get);

router.get('/posts', categoryCtrl.category_posts_get);

module.exports = router;
