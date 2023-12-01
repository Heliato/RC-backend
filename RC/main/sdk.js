const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const sdkv1 = JSON.parse(fs.readFileSync(path.join(__dirname, "../../files/sdkv1.json")).toString());

app.get("/sdk/v1/default", async (req, res) => {
    res.json(sdkv1);
});

app.get("/sdk/v1/product/:product_id", async (req, res) => {
    res.json(sdkv1);
});

module.exports = app;