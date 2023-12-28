const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    image: String
},{
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);

module.exports = {Category};    