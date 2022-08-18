/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const mongoose = require("mongoose");

// Constants

const chatEvent = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    timeStamp: {
        type: Date,
        required: true,
        default: (new Date()).toISOString().replace(/T/,", ").slice(0, -8)
    },

    event: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true,
        default: ""
    },

    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: false,
    }
});

// Exports

module.exports = mongoose.model("ChatEvent", chatEvent);