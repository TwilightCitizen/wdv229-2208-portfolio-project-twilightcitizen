/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Group = require("../models/group");

// Routes

router.get("/private", (request, response, next) => {
    User
        .find({ isFriend: true })
        .sort("displayName")
        .exec()
        .then(result => {
            if (!result) { throw new Error("Error Fetching Friends for Private Chats"); }

            console.log("Fetched Friends for Private Chats");
            response.status(200).json(result);
        })
        .catch(error => {
            console.error(error.message);
            next(error);
        });
});

router.get("/group", (request, response, next) => {
    Group
        .find()
        .sort("displayName")
        .exec()
        .then(result => {
            if (!result) { throw new Error("Error Fetching Groups for Group Chats"); }

            console.log("Fetched Groups for Group Chats");
            response.status(200).json(result);
        })
        .catch(error => {
            console.error(error.message);
            next(error);
        });
});

// Exports

module.exports = router;