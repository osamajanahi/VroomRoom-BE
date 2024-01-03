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

// Assuming edit route needs an image, use upload.single
router.get('/edit', categoryCtrl.category_detail_get);
router.post('/edit', upload.single('image'), categoryCtrl.category_edit_post); // Upload middleware added here

router.get('/delete', categoryCtrl.category_delete_get);
router.get('/detail', categoryCtrl.category_detail_get);

module.exports = router;
