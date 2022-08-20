/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { kikBot, registerEvents } = require("../bot/kikBot");

// Configuration

dotenv.config();

// Constants

const serverPort = process.env.SERVER_PORT;
const serverUp = `Server is up on port ${serverPort}.`;
const serverDown = "Server is down.";

const mongoDbUrl = process.env.MONGO_DB_URL;
const mongoDbConnection = `MongoDB connected to ${mongoDbUrl}`;

const mongoDBConnectionError = errorMessage =>
    `MongoDB failed or lost connection to ${mongoDbUrl}: ${errorMessage ?? "Unspecified Error"}`;

const kikBotUsername = process.env.KIK_BOT_USERNAME;
const kikBotPassword = process.env.KIK_BOT_PASSWORD;

// Server

/*
Server presently responds to all requests with a server up message.
Its behavior will eventually be supplanted by an Express app.
*/
const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: serverUp }));
});

// Server Events

/*
Log the server closures to the console.
*/
server.on("close", () => console.error(serverDown));

// Database

/*
Log database connection errors to the console.
*/
mongoose.connect(mongoDbUrl).catch(error =>
    console.error(mongoDBConnectionError(error.message))
);

// Database Events

/*
The server and Kik bot rely on the database connection.
The server relies on the Kik bot being ready.
Register the Kik bot for its events and authenticate,
the listen on the server for requests.
*/
mongoose.connection.on("connected", () => {
    console.log(mongoDbConnection);
    registerEvents(kikBot);
    kikBot.authenticate(kikBotUsername, kikBotPassword);
    server.listen( serverPort, () => console.log(serverUp));
});

/*
The database connection can go down with or without an error.
If it does, stop listening on the sever for requests, and stop
the Kik bot from logging chat information to the database.
*/

mongoose.connection.on("disconnected", () => {
    console.error(mongoDBConnectionError());
    server.close();
    kikBot.connection.disconnect();
});

mongoose.connection.on("error", error => {
    console.error(mongoDBConnectionError(error.message));
    server.close();
    kikBot.connection.disconnect();
});