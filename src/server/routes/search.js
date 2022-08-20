/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const express = require("express");
const router = express.Router();
const { kikBot } = require("../bot/kikBot");

// Constants

const projectGroups = groups =>
    groups.map(group => {
        const { jid, code, name } = group;

        return ({ groupId: jid, hashTag: code, displayName: name });
    });

// Routes

router.get("/:query", (request, response) => {
    kikBot.searchGroups(request.params.query, groups => {
        response.status(200).json(projectGroups(groups));
    });
});

// Exports

module.exports = router;