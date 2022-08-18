/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const mongoose = require("mongoose");

// Constants

const group = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    jid: {
        type: String,
        required: true
    },

    hashTag: {
        type: String,
        required: true
    },

    displayName: {
        type: String,
        required: true
    }
});

// Exports

module.exports = mongoose.model("Group", group);