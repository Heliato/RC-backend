const express = require('express');
const app = express();
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

app.post("/epic/oauth/v1/revoke", async (req, res) => {
    const token = req.body.token;
    const decodedToken = jwt.decode(token); // you can get the token here

    res.status(204).end();
});

module.exports = app;