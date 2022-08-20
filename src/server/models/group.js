/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const mongoose = require("mongoose");

// Schemas

const group = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    hashTag: {
        type: String,
        required: false
    },

    displayName: {
        type: String,
        required: true
    }
});

// Models

const Group = mongoose.model("Group", group);

// Exports

module.exports = Group;