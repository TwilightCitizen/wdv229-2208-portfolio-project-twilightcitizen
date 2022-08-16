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

http.createServer((request, response) => {
    const message = `Service listening on port ${serverPort}.`;

    console.log(message);

    response.writeHead(200, { 'Content-Type': 'application/json' });

    response.end(JSON.stringify({
        message: message
    }));
}).listen( serverPort );