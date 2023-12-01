const fs = require("fs");
const path = require("path");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

function addHours(hours) {
    let date = new Date();
    date.setHours(date.getHours() + hours);
    return date.toISOString();
}

function getClientId(req) {
    var client_id = uuid.v4().replace(/-/ig, "");

    try {
        client_id = Buffer.from(req.headers["authorization"].split(" ")[1], "base64").toString().split(":")[0];
    } catch { }

    return client_id;
}

function createCredentialsAccessToken(client_id, features, deployment_id) {
    const accessToken = jwt.sign({
        "clientId": client_id,
        "productId": "7c0a8a40ba4a47dd899eed51a8fbc3fe",
        "iss": "eos",
        "env": "prod",
        "organizationId": "o-7aklpapnk74p66sqs6hm5byt29wp66",
        "features": features,
        "deploymentId": deployment_id,
        "sandboxId": "933ada2ec45e4184ae840d64c99e0ba9",
        "tokenType": "clientToken"
    }, global.JWT_SECRET, { "expiresIn": `2h` });

    return accessToken;
}

function createAccessToken(client_id, scope, deployment_id, display_name) {
    const accessToken = jwt.sign({
        "sub": "rc_account_id",
        "pfsid": "933ada2ec45e4184ae840d64c99e0ba9", // sandboxId
        "iss": "https://api.epicgames.dev/epic/oauth/v1",
        "dn": display_name,
        "nonce": "n-grHZ5FRFm5HZbWTb8oazlCR4+ms=",
        "pfpid": "7c0a8a40ba4a47dd899eed51a8fbc3fe", // productId
        "sec": 1,
        "aud": client_id,
        "pfdid": deployment_id,
        "t": "epic_id",
        "scope": scope,
        "appid": "fghi45675K7XVUDdFj3eiSRrZK6gYqWQ"
    }, global.JWT_SECRET, { "expiresIn": `2h` });

    return accessToken;
}

function createRefreshToken(client_id, scope, deployment_id, display_name) {
    const accessToken = jwt.sign({
        "sub": "rc_account_id",
        "pfsid": "933ada2ec45e4184ae840d64c99e0ba9", // sandboxId
        "iss": "https://api.epicgames.dev/epic/oauth/v1",
        "dn": display_name,
        "pfpid": "7c0a8a40ba4a47dd899eed51a8fbc3fe", // productId
        "aud": client_id,
        "pfdid": deployment_id,
        "t": "epic_id",
        "appid": "fghi45675K7XVUDdFj3eiSRrZK6gYqWQ",
        "scope": scope
    }, global.JWT_SECRET, { "expiresIn": `8h` });

    return accessToken;
}

function createIdToken(client_id, deployment_id, display_name) {
    const accessToken = jwt.sign({
        "sub": "rc_account_id",
        "pfsid": "933ada2ec45e4184ae840d64c99e0ba9", // sandboxId
        "iss": "https://api.epicgames.dev/epic/oauth/v1",
        "dn": display_name,
        "nonce": "n-br7DdaIQjqQcaC7oX1mqWSmNAI4=",
        "pfpid": "7c0a8a40ba4a47dd899eed51a8fbc3fe", // productId
        "aud": client_id,
        "pfdid": deployment_id,
        "t": "id_token",
        "appid": "fghi45675K7XVUDdFj3eiSRrZK6gYqWQ"
    }, global.JWT_SECRET, { "expiresIn": `8h` });

    return accessToken;
}

module.exports = {
    createCredentialsAccessToken,
    createRefreshToken,
    createAccessToken,
    createIdToken,
    getClientId,
    addHours
};