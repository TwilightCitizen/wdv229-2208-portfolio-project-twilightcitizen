/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const mongoose = require("mongoose");

// Schemas

const chatEvent = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    fromUser: {
        type: String,
        ref: "User",
        required: true
    },

    timeStamp: {
        type: String,
        required: true,
        default: () => (new Date()).toISOString().replace(/T/,", ").slice(0, -5)
    },

    orderStamp: {
        type: Date,
        required: true,
        default: () => new Date()
    },

    event: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: false
    }
});

// Models

const ChatEvent = mongoose.model("ChatEvent", chatEvent);

// Discriminators

const PrivateChatEvent = ChatEvent.discriminator(
    "PrivateChatEvent",

    new mongoose.Schema({
        toUser: {
            type: String,
            ref: "User",
            required: true,
        }
    })
);

const GroupChatEvent = ChatEvent.discriminator(
    "GroupChatEvent",

    new mongoose.Schema({
        toGroup: {
            type: String,
            ref: "Group",
            required: true,
        }
    })
);

// Exports

module.exports = { ChatEvent, PrivateChatEvent, GroupChatEvent };