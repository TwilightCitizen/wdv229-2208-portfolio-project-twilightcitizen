
/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const KikClient = require("kik-node-api");
const mongoose = require("mongoose");
const User = require("../models/user");
const ChatEvent = require("../models/chatEvent");
const Group = require("../models/group");
const dotenv = require("dotenv");

// Configuration

dotenv.config();

// Constants

const kikBotId = process.env.KIK_BOT_JID;

// Kik Bot

const kikBot = new KikClient({
    promptCaptchas: true,

    device: {},

    logger: {
        file: ["warning", "error", "info", "raw"],
        console: ["warning", "error", "info"]
    }
});

// Kik Bot Database Operations

const clearGroups = () => {
    Group
        .deleteMany()
        .exec()
        .then(result => console.log(`Cleared ${result.deletedCount} Groups.`))
        .catch(error => console.error(`Error Clearing Users: ${error.message}`));
};

const clearUsers = () => {
    User
        .deleteMany()
        .exec()
        .then(result => console.log(`Cleared ${result.deletedCount} Users.`))
        .catch(error => console.error(`Error Clearing Users: ${error.message}`));
};

const saveGroups = groups => {
    groups.forEach(group => {
        const newGroup = {
            displayName: group.name,

            ...(group.code && { hashTag: group.code })
        };

        const options = {
            upsert: true,
            setDefaultsOnInsert: true
        };

        Group
            .findByIdAndUpdate(group.jid, newGroup, options)
            .exec()
            .then(() => console.log(`Saved Group ${newGroup.displayName}.`))
            .catch(error => console.error(`Error Saving Group: ${error.message}`));
    });
};

const saveGroupUsers = groups => {
    const jids = groups.reduce((prevGroup, currGroup) =>
        [...prevGroup, ...currGroup.users.map(user => user.jid )], []
    );

    kikBot.getUserInfo(jids, false, users => {
        saveUsers(users);
    });
};

const saveUsers = (users, isFriend = false) => {
    users.forEach(user => {
        const newUser = {
            username: user.username,
            displayName: user.displayName,

            ...(isFriend && { isFriend: isFriend }),
            ...(user.pic && { profilePic: user.pic })
        }

        const who = isFriend ? "Friend" : "User";

        const options = {
            upsert: true,
            setDefaultsOnInsert: true
        };

        User
            .findByIdAndUpdate(user.jid, newUser, options)
            .exec()
            .then(() => console.log(`Saved ${who} ${newUser.displayName}.`))
            .catch(error => console.error(`Error Saving ${who}: ${error.message}`));
    });
};

const saveChatEvent = (userId, eventStr, content, groupId) => {
    const newChatEvent = new ChatEvent({
        _id: mongoose.Types.ObjectId(),
        userId: userId,
        event: eventStr,

        ...(content && { content: content}),
        ...(groupId && { groupId: groupId})
    });

    newChatEvent
        .save()
        .then(() => console.log(`Saved New ${eventStr}.`))
        .catch(error => console.error(`Error Saving New ${eventStr}: ${error.message}`));
};

// Kik Bot Responses

const handleGroupReceive = (userId, eventStr, it, groupId) => {
    console.log(`Received Group ${eventStr} from ${userId} in ${groupId}: ${it}`);
    console.log(`Saving Group ${eventStr}.`);
    saveChatEvent(userId, eventStr, it, groupId);
    console.log(`Echoing ${eventStr} Back`);
    kikBot.sendMessage(groupId, it);
    console.log(`Saving ${eventStr} Back.`);
    saveChatEvent(kikBotId, eventStr, it, groupId);
};

const handlePrivateReceive = (userId, eventStr, it) => {
    console.log(`Received Private ${eventStr} from ${userId}: ${it}`);
    console.log("Adding User as Friend");
    kikBot.addFriend(userId);  // TODO: Capture Peer Info for Saving
    console.log(`Saving Private ${eventStr}.`);
    saveChatEvent(userId, eventStr, it, null);
    console.log(`Echoing ${eventStr} Back`);
    kikBot.sendMessage(userId, it)
    console.log(`Saving ${eventStr} Back.`);
    saveChatEvent(kikBotId, eventStr, it, null);
};

// Kik Bot Events

const registerEvents = kikBot => {
    // Join Events

    kikBot.on("authenticated", () => {
        console.log("Authenticated.");
        console.log("Clearing Groups.");
        clearGroups();
        console.log("Clearing Users.");
        clearUsers();
    });

    kikBot.on("receivedroster", (groups, friends) => {
        console.log("Received Rosters.");
        console.log("Saving Groups.");
        saveGroups(groups);
        console.log("Saving Group Users.");
        saveGroupUsers(groups);
        console.log("Saving Friends.");
        saveUsers(friends, true);
    });

    kikBot.on("receivedcaptcha", (captchaUrl) => {
        console.error("Received Captcha.");
        console.error(`Solve Captcha at ${captchaUrl}.`);
    });

    kikBot.on("receivedjidinfo", (users) => {
        console.log("Received Peer Info:");
        console.log(users);
        
    });

    // Group Chat Events

    kikBot.on("receivedgroupmsg", (groupId, userId, chat) => {
        handleGroupReceive(userId, "Chat", chat, groupId);
    });

    kikBot.on("receivedgroupimg", (groupId, userId, image) => {
        handleGroupReceive(userId, "Image", image, groupId);
    })

    kikBot.on("receivedgroupgif", (groupId, userId, gif) => {
        handleGroupReceive(userId, "GIF", JSON.parse(gif)[0], groupId);
    });

    kikBot.on("userleftgroup", (groupId, userId) => {
        console.log(`User ${userId} Left ${groupId}.`);
        console.log("Saving Group Leave");
        saveChatEvent(userId, "Leave", null, groupId);
    });

    kikBot.on("userjoinedgroup", (groupId, userId) => {
        console.log(`${userId} Joined ${groupId}.`);
        console.log("Saving Group Join");
        saveChatEvent(userId, "Join", null, groupId);
    });

    // Private Chat Events

    kikBot.on("receivedprivatemsg", (userId, chat) => {
        handlePrivateReceive(userId, "Chat", chat);
    });

    kikBot.on("receivedprivateimg", (userId, image) => {
        handlePrivateReceive(userId, "Image", image);
    })

    kikBot.on("receivedprivategif", (userId, gif) => {
        handlePrivateReceive(userId, "GIF", JSON.parse(gif)[0]);
    });
}

// Exports

module.exports = { kikBot, registerEvents };