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

    userName: {
        type: String,
        required: true
    },

    displayName: {
        type: String,
        required: true
    }
});

// Exports

module.exports = mongoose.model("User", user);