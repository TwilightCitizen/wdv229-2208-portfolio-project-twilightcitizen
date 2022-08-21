/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const express = require("express");
const router = express.Router();
const axios = require('axios');

// Constants

const url = username => `https://ws2.kik.com/user/${username}`;

// Routes

router.get("/:username", (request, response, next) => {
    const username = request.params.username;

    axios.get(url(username))
        .then(resp => {
            console.log(`Fetched Profile Pic for ${username}`);

            response.status(200).json({
                profilePic: resp.data.displayPic
            });
        })
        .catch(error => {
            console.error(error.message);
            next(error);
        });
});

// Exports

module.exports = router;