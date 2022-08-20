
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
const { PrivateChatEvent, GroupChatEvent } = require("../models/chatEvent");
const Group = require("../models/group");
const dotenv = require("dotenv");

// Configuration

dotenv.config();

// Constants

// Kik bot's own JID needed for logging some chat events.
const kikBotId = process.env.KIK_BOT_JID;

// Kik Bot

/*
Raw logging useful if the Kik bot fails to authenticated.
Can be found in logs/_ANON_.txt
*/
const kikBot = new KikClient({
    promptCaptchas: true,

    device: {},

    logger: {
        file: ["warning", "error", "info", "raw"],
        console: ["warning", "error", "info"]
    }
});

// Kik Bot Database Operations

/*
Groups are upserted into the database when received after authentication
and when requested after group events if the bot discovers it has been
added to a group of which it has no record.
*/
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

/*
All the users in each group, after deduplication, are saved without friendship.
This only happens after authentication because there are methods to get user
information for a single user without requesting rosters.
*/
const saveGroupUsers = groups => {
    const userIds = groups.reduce((prevGroup, currGroup) =>
        [...prevGroup, ...currGroup.users.map(user => user.jid )], []
    );

    const uniqueUserIds = [...new Set(userIds)];

    kikBot.getUserInfo(uniqueUserIds, false, users => saveUsers(users));
};

/*
Save user just wraps a single user into an array and forwards to saveUsers.
*/
const saveUser = (userId, isFriend = false) => {
    kikBot.getUserInfo([userId], false, users => saveUsers(users, isFriend));
};

/*
Users are upserted into the database when received after authentication
and when requested after group events if the bot discovers it has been
added to a group of which it has no record.  Also called for individual
users as needed.
*/
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

/*
Differentiate between group and user IDs.
*/
const isUserId = userOrGroupId =>
    userOrGroupId.split("@")[1] === "talk.kik.com"

/*
Chat events are saved, not upserted, because even if their contents without respect
to timestamp are the same, they are still unique.  Private and Group ChatEvens are
discriminators against the ChatEvent model.
*/
const saveChatEvent = (fromUserId, eventStr, content, toUserOrGroupId) => {
    const common = {
        _id: mongoose.Types.ObjectId(),
        fromUser: fromUserId,
        event: eventStr,
        ...(content.length > 0 ? { content: content } : null)
    };

    const newChatEvent = isUserId(toUserOrGroupId) ?
        new PrivateChatEvent({
            ...common,

            toUser: toUserOrGroupId
        }) : new GroupChatEvent({
            ...common,

            toGroup: toUserOrGroupId
        });

    newChatEvent
        .save()
        .then(() => console.log(`Saved New ${eventStr}.`))
        .catch(error => console.error(`Error Saving New ${eventStr}: ${error.message}`));
};

/*
The Kik bot may become party to a new group at any time, and there is presently no way
to query for information about an individual group ID.  Instead, it must see if the group
ID exists in the group collection, and if not, request fresh rosters.
*/
const checkForGroup = groupId => {
    Group
        .findById(groupId)
        .exec()
        .then(result => {
            if (!result) {
                console.log(`Group ${groupId} Not Found.`);
                console.log("Requesting Group Rosters");

                kikBot.getRoster((groups) => {
                    console.log("Saving Groups.");
                    saveGroups(groups);
                });
            } else {
                console.log(`Group ${groupId} Found.`);
            }
        })
        .catch(error => console.error(`Error Checking for Group ${groupId}: ${error.message}`));
};

// Kik Bot Responses

/*
Groups can receive chats, images, and GIFs from users, to which the Kik bot
responds mostly uniformly.  Saving the user is not necessary in the case where
the group is new to the bot, but it is necessary if the group is not because
the user could have changed his or her display name or profile picture.
*/
const handleGroupReceive = (userId, eventStr, it, groupId) => {
    console.log(`Received Group ${eventStr} from ${userId} in ${groupId}: ${it}`);
    console.log(`Saving Group ${eventStr}.`);
    saveChatEvent(userId, eventStr, it, groupId);
    console.log(`Echoing ${eventStr} Back`);
    kikBot.sendMessage(groupId, it);
    console.log(`Saving ${eventStr} Back.`);
    saveChatEvent(kikBotId, eventStr, it, groupId);
    console.log(`Saving User ${userId}.`);
    saveUser(userId);
    console.log(`Checking for Group ${groupId}`);
    checkForGroup(groupId);
};

/*
The Kik bot responds mostly uniformly to private chats, images, and GIFs it
receives from users.  New private chats can occur at any time, and while adding
the user as a friend is not necessary for updating friendship for an existing
friend, but necessary because the friend could have changed his or her display
name or profile picture.
*/
const handlePrivateReceive = (userId, eventStr, it) => {
    console.log(`Received Private ${eventStr} from ${userId}: ${it}`);
    console.log("Adding User as Friend");
    kikBot.addFriend(userId);
    console.log(`Saving Private ${eventStr}.`);
    saveChatEvent(userId, eventStr, it, kikBotId);
    console.log(`Echoing ${eventStr} Back`);
    kikBot.sendMessage(userId, it)
    console.log(`Saving ${eventStr} Back.`);
    saveChatEvent(kikBotId, eventStr, it, userId);
    console.log(`Saving Friend ${userId}.`);
    saveUser(userId, true);
};

// Kik Bot Events

/*
Register events must be called by the server using this Kik bot.
*/
const registerEvents = kikBot => {
    // Join Events

    /*
    Just log authentication success.
    */
    kikBot.on("authenticated", () => {
        console.log("Authenticated.");
    });

    /*
    Log receipt of rosters, save groups, group users, and
    friends, logging these actions, too.
    */
    kikBot.on("receivedroster", (groups, friends) => {
        console.log("Received Rosters.");
        console.log("Saving Groups.");
        saveGroups(groups);
        console.log("Saving Group Users.");
        saveGroupUsers(groups);
        console.log("Saving Friends.");
        saveUsers(friends, true);
    });

    /*
    The Kik bot should not have to solve captcha since it is
    not authenticating anonymously, but on the chance a captcha
    is required, log receipt of captcha and the URL where it
    must be solved to allow authentication to procede.
    */
    kikBot.on("receivedcaptcha", (captchaUrl) => {
        console.error("Received Captcha.");
        console.error(`Solve Captcha at ${captchaUrl}.`);
    });

    // Group Chat Events

    /*
    Receipt of group chats, images, and GIFs are handled mostly uniformly.
    */

    kikBot.on("receivedgroupmsg", (groupId, userId, chat) => {
        handleGroupReceive(userId, "Chat", chat, groupId);
    });

    kikBot.on("receivedgroupimg", (groupId, userId, image) => {
        handleGroupReceive(userId, "Image", image, groupId);
    })

    kikBot.on("receivedgroupgif", (groupId, userId, gif) => {
        handleGroupReceive(userId, "GIF", JSON.parse(gif)[0], groupId);
    });

    /*
    Log chat event for user leaving a group.  Since this could be the
    first thing the Kik bot receives from a group to which it was not
    previously party, save the user and check for the group.
    */
    kikBot.on("userleftgroup", (groupId, userId) => {
        console.log(`User ${userId} Left ${groupId}.`);
        console.log(`Saving User ${userId}.`);
        saveUser(userId);
        console.log("Saving Group Leave");
        saveChatEvent(userId, "Leave", null, groupId);
        console.log(`Checking for Group ${groupId}`);
        checkForGroup(groupId);
    });

    /*
    Log chat event for user joining a group.  Since this could be the
    first thing the Kik bot receives from a group to which it was not
    previously party, save the user and check for the group.
    */
    kikBot.on("userjoinedgroup", (groupId, userId) => {
        console.log(`${userId} Joined ${groupId}.`);
        console.log(`Saving User ${userId}.`);
        saveUser(userId);
        console.log("Saving Group Join");
        saveChatEvent(userId, "Join", null, groupId);
        console.log(`Checking for Group ${groupId}`);
        checkForGroup(groupId);
    });

    // Private Chat Events

    /*
    Receipt of private chats, images, and GIFs are handled mostly uniformly.
    */

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