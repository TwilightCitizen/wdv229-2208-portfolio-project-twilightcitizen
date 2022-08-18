
/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const KikClient = require("kik-node-api");
const mongoose = require("mongoose");

// Kik Bot

const kikBot = new KikClient({
    promptCaptchas: true,

    device: {},

    logger: {
        file: ["warning", "error", "info", "raw"],
        console: ["warning", "error", "info"]
    }
});

// Kik Bot Events

const registerEvents = kikBot => {
    // Join Events

    kikBot.on("authenticated", () => {
        console.log("Authenticated.\n");
    });

    kikBot.on("receivedroster", (groups, friends) => {
        console.log("Received Rosters.\n");
        console.log("Groups:\n");
        console.log(groups);
        console.log("\n");
        console.log("Friends:\n");
        console.log(friends);
        console.log("\n");
    });

    kikBot.on("receivedcaptcha", (captchaUrl) => {
        console.log(`Solve Captcha at ${captchaUrl}\n.`);
    });

    kikBot.on("receivedjidinfo", (users) => {
        console.log("Received Peer Info:\n");
        console.log(users);
        console.log("\n");
    });

    // Group Chat Events

    kikBot.on("receivedgroupmsg", (groupJid, senderJid, msg) => {
        console.log(`Received Group Message from ${senderJid} in ${groupJid}: ${msg}\n`);
    });

    kikBot.on("receivedgroupimg", (senderJid, img) => {
        console.log(`Received Group Image from ${senderJid} in ${groupJid}: ${img}.\n`);
    })

    kikBot.on("receivedgroupgif", (senderJid, gif) => {
        console.log(`Received Group GIF from ${senderJid} in ${groupJid}: ${gif}.\n`);
    });

    kikBot.on("userleftgroup", (groupJid, userJid, wasKicked) => {
        console.log(`User ${userJid} ${wasKicked ? 'Kicked from' : 'Left'} ${groupJid}.\n`);
    });

    kikBot.on("userjoinedgroup", (groupJid, userJid, wasInvited) => {
        console.log(`${userJid} ${wasInvited ? 'Invited to' : 'Joined'} ${groupJid}.\n`);
    });

    // Private Chat Events

    kikBot.on("receivedprivatemsg", (senderJid, msg) => {
        console.log(`Received Private Message from ${senderJid}: ${msg}\n`);
        kikBot.addFriend(senderJid);

        // Echo message back.
        kikBot.sendMessage(senderJid, msg, (delivered, read) => {
            if (delivered) {
                console.log(`Private Message to ${senderJid} Read.\n`);
            } else if (read) {
                console.log(`Private Message to ${senderJid} Delivered.\n`);
            } else {
                console.log(`Private Message to ${senderJid} sent.\n`);
            }
        });
    });

    kikBot.on("receivedprivateimg", (senderJid, img) => {
        console.log(`Received Private Image from ${senderJid}: ${img}.\n`);
        kikBot.addFriend(senderJid);
    })

    kikBot.on("receivedprivategif", (senderJid, gif) => {
        console.log(`Received Private GIF from ${senderJid}: ${gif}.\n`);
        kikBot.addFriend(senderJid);
    });
}

// Exports

module.exports = { kikBot, registerEvents };