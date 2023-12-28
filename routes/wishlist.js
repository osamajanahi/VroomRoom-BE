// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require wishlist controller
const wishlistCtrl = require('../controllers/wishlist');




router.post("/add",  wishlistCtrl.wish_create_post);
router.delete("/delete", isLoggedIn, Cntrl.wish_delete_get);
router.get("/edit", wishlistCtrl.wish_edit_get);
router.put("/update",wishlistCtrl.wish_update_put);



module.exports = router;