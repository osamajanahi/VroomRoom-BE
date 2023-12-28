// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require wishlist controller
const wishlistCtrl = require('../controllers/wishlist');



// router.get("/add", wishlistCtrlCntrl.wish_create_get);
router.post("/add",  wishlistCtrl.wish_create_post);
// router.delete("/delete", isLoggedIn, Cntrl.wish_delete_get);



module.exports = router;