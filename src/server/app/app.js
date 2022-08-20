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
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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

    /*
    These may not be necessary.  Keeping handy if needed.

    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (request.method === "OPTIONS") {
        response.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, GET, PATCH, DELETE"
        );
    }
    */

    next();
});

// Index Service Message

app.get("/", (request, response) => {
    response.status(200).json({
        message: `Service Up on Port ${serverPort}.`
    });
});

// Router Middleware



// Error Handling Middleware

app.use((request, response, next) => {
    const error = new Error("NOT FOUND");

    error.status = 404;

    next(error)
});

app.use((error, request, response) => {
    response.status(error.status || 500).json({
        error: error.message
    });
});

// Exports

module.exports = app;