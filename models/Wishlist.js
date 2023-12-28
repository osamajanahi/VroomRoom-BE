const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    name: String,
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    image: String
},{
    timestamps: true
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = {Wishlist};    