const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    phoneNumber: String,
    password: String,
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist'
    }]
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = {User};    