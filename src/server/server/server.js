/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const http = require("http");
const dotenv = require("dotenv");

// Configuration

dotenv.config();

// Environment

const serverPort = process.env.SERVER_PORT;

// Service

http.createServer().listen( serverPort, () =>
    console.log(`Service listening on port ${serverPort}.`)
);