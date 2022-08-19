/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const mongoose = require("mongoose");

// Constants

const user = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    displayName: {
        type: String,
        required: true
    },

    profilePic: {
        type: String,
        required: false
    },

    isFriend: {
        type: Boolean,
        required: false
    }
});

// Exports

module.exports = mongoose.model("User", user);