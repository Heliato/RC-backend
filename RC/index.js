const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ "extended": true }));

// Setup
app.use(require("./setup.js"));

app.use(require("./auth/auth.js"));
app.use(require("./auth/revoke.js"))

app.use(require("./main/telemetry.js"));
app.use(require("./main/main.js"));
app.use(require("./main/sdk.js"));

app.use(require("./friends/friends.js"));

app.use(require("./presence/presence.js"));

global.JWT_SECRET = uuid.v4();

app.use((req, res, next) => {
    console.log(`\x1b[31mErrorLog - ${req.path} | (${req.method})\x1b[0m`);
    next();
});

app.listen(3551, () => {
    console.log(`Port 3551 successfully opened.`);
}).on("error", async (err) => {
    if (err.code == "EADDRINUSE") {
        console.log(`Port 3551 is already in use.`);
    } else throw err;
});
