// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require post controller
const postCtrl = require('../controllers/post');
// Multer
const upload = require('../config/multerConfig');



router.use(express.json());

router.post('/add', upload.array('image',5), postCtrl.post_create_post);
router.get('/index', postCtrl.post_index_get);
router.get('/edit', postCtrl.post_detail_get);
router.post('/edit', upload.array('image',5), postCtrl.post_edit_post);
router.get('/delete', postCtrl.post_delete_get);
router.get('/detail', postCtrl.post_detail_get);

module.exports = router;