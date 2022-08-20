/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const chats = require("../routes/chats");
const details = require("../routes/details");

// Configuration

dotenv.config();

// Constants

const serverPort = process.env.SERVER_PORT;

// Logging Middleware

app.use(morgan("dev"));

// Parsing Middleware

app.use(express.urlencoded({ extended: true }));

// Request Format Middleware

app.use(express.json());

// CORS Policy Middleware

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    next();
});

// Index Service Message

app.get("/", (request, response) => {
    response.status(200).json({
        message: `Service Up on Port ${serverPort}.`
    });
});

// Router Middleware

app.use("/chats", chats);
app.use("/details", details);

// Error Handling Middleware

app.use((request, response, next) => {
    const error = new Error("Not Found");

    error.status = 404;

    next(error)
});

app.use((error, request, response, next) => {
    response.status(error.status || 500).json({
        error: error.message
    });
});

// Exports

module.exports = app;