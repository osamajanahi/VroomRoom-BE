// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require wishlist controller
const wishlistCtrl = require('../controllers/wishlist');
router.use(express.json());


router.post("/add",  wishlistCtrl.wish_create_post);
router.post("/delete", wishlistCtrl.wish_delete_get); // isLoggedIn,
router.get("/show", wishlistCtrl.wish_show_get);



module.exports = router;