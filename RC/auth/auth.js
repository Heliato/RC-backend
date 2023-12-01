const express = require('express');
const app = express();
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { addHours, getClientId, createIdToken, createRefreshToken, createAccessToken, createCredentialsAccessToken } = require("../function/func-auth.js");

app.post("/auth/v1/oauth/token", async (req, res) => {
    const grant_type = req.body.grant_type;
    const deployment_id = req.body.deployment_id;
    const client_id = getClientId(req);
    const features = [
        "Achievements",
        "AntiCheat",
        "Connect",
        "Ecom",
        "Leaderboards",
        "Lobbies",
        "Matchmaking",
        "Metrics",
        "PlayerDataStorage",
        "PlayerReports",
        "Sanctions",
        "Stats"
    ];

    switch (grant_type) {
        case "client_credentials":
            return res.json({
                "access_token": createCredentialsAccessToken(client_id, features, deployment_id),
                "token_type": "bearer",
                "expires_at": new Date().toISOString(),
                "features": features,
                "organization_id": "o-7aklpapnk74p66sqs6hm5byt29wp66",
                "product_id": "7c0a8a40ba4a47dd899eed51a8fbc3fe",
                "sandbox_id": "933ada2ec45e4184ae840d64c99e0ba9",
                "deployment_id": deployment_id,
                "expires_in": 3599
            });
        default:
            console.log("invalid grant_type:", grant_type);
            res.status(401).end();
            break;
    }
});

app.post("/epic/oauth/v1/token", async (req, res) => {
    const grant_type = req.body.grant_type;
    const deployment_id = req.body.deployment_id;
    const scope = (req.body.scope == "openid") ? "basic_profile friends_list openid presence" : "openid";
    const client_id = getClientId(req);

    switch (grant_type) {
        case "exchange_code":
            global.Username = req.body.exchange_code;

            return res.json({
                "scope": scope,
                "token_type": "bearer",
                "access_token": createAccessToken(client_id, scope, deployment_id, global.Username),
                "refresh_token": createRefreshToken(client_id, scope, deployment_id, global.Username),
                "id_token": createIdToken(client_id, deployment_id, global.Username),
                "expires_in": 7200,
                "expires_at": "9999-12-31T23:59:59.999Z",
                "refresh_expires_in": 28800,
                "refresh_expires_at": "9999-12-31T23:59:59.999Z",
                "account_id": "rc_account_id",
                "client_id": client_id,
                "application_id": "fghi45675K7XVUDdFj3eiSRrZK6gYqWQ",
                "selected_account_id": "rc_account_id",
                "merged_accounts": [],
                "acr": "AAL1",
                "auth_time": new Date().toISOString()
            });
        default:
            console.log("invalid grant_type:", grant_type);
            res.status(401).end();
            break;
    }
});

app.get("/epic/id/v1/accounts", async (req, res) => {
    res.json([
        {
            "accountId": req.query.accountId || "rc_account_id",
            "displayName": global.Username,
            "preferredLanguage": "fr",
            "linkedAccounts": []
        }
    ]);
});

app.post("/epic/oauth/v1/tokenInfo", async (req, res) => {
    res.json({
        "active": true,
        "scope": "basic_profile friends_list openid presence",
        "token_type": "bearer",
        "expires_in": 7200,
        "expires_at": "9999-12-31T23:59:59.999Z",
        "account_id": "rc_account_id",
        "client_id": "xyza7891xYAT8qUVIZ5Xv9akL87lEEDS",
        "application_id": "fghi45675K7XVUDdFj3eiSRrZK6gYqWQ"
    });
});

module.exports = app;