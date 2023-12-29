const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    user: {  type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    

},{
    timestamps: true
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = {Wishlist};    