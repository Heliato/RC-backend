const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

app.post("/telemetry/data/datarouter/api/v1/public/data", async (req, res) => res.status(204).end());
app.post("/datarouter/api/v1/public/data/clients", async (req, res) => res.status(204).end());
app.options("/v1/features", async (req, res) => res.status(200).end());

module.exports = app;