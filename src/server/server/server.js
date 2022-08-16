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

// Server

const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });

    response.end(JSON.stringify({
        message: serverUp
    }));
});

// Server Events

server.on("close", () => console.error(serverDown));

// Database

mongoose.connect(mongoDbUrl).catch(error =>
    console.error(mongoDBConnectionError(error.message))
);

// Database Events

mongoose.connection.on("connected", () => {
    console.log(mongoDbConnection);
    server.listen( serverPort, () => console.log(serverUp));
});

mongoose.connection.on("disconnected", () => {
    console.error(mongoDBConnectionError());
    server.close();
});

mongoose.connection.on("error", error => {
    console.error(mongoDBConnectionError(error.message));
    server.close();
});