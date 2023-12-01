const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

app.options("/telemetry/data", async (req, res) => {
    res.status(204).end();
});

module.exports = app;