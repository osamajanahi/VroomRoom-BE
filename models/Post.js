const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    location: String,
    price: Number,
    image: String,
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist'
    }],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
},{
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports = {Post};    