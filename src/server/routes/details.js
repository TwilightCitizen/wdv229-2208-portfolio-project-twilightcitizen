/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { ChatEvent } = require("../models/chatEvent");

// Configuration

dotenv.config();

// Constants

const kikBotId = process.env.KIK_BOT_JID;

const isUserId = userOrGroupId =>
    userOrGroupId.split("@")[1] === "talk.kik.com"

// Routes

router.get("/:id", (request, response, next) => {
    const id = request.params.id;

    const filter = isUserId(id) ?
        { $or: [
            { fromUser: id, toUser: kikBotId, __t: "PrivateChatEvent" },
            { fromUser: kikBotId, toUser: id, __t: "PrivateChatEvent" }
        ] } :

        { toGroup: id, __t: "GroupChatEvent" };

    const children = ["fromUser", isUserId(id) ? "toUser" : "toGroup"];

    ChatEvent
        .find(filter)
        .sort('orderStamp')
        .populate(children)
        .exec()
        .then(result => {
            if (!result) { throw new Error("Error Chat Details"); }

            console.log("Fetched Chat Details");
            response.status(200).json(result);
        })
        .catch(error => {
            console.error(error.message);
            next(error);
        });
});

// Exports

module.exports = router;