const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

app.get("/epic/friends/v1/:account_id", async (req, res) => {
    res.json({
        "blockList": [],
        "friends": []
    });
});

module.exports = app;