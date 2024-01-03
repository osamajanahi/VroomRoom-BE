const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: { 
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    type: {
        type: String
    }
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = {User};    