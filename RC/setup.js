const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");

app.use((req, res, next) => {
    console.log(`Log - ${req.path} | ${req.method} (${req.ip.replace("::ffff:", "")})`)

    next();
});

module.exports = app;