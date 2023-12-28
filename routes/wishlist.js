// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require wishlist controller
const wishlistCtrl = require('../controllers/wishlist');
router.use(express.json());


router.post("/add",  wishlistCtrl.wish_create_post);
router.delete("/delete", wishlistCtrl.wish_delete_get); // isLoggedIn,
router.get("/edit", wishlistCtrl.wish_edit_get);
router.put("/update",wishlistCtrl.wish_update_put);



module.exports = router;