const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

app.patch("/epic/presence/v1/:ns/rc_account_id/presence/:id", async (req, res) => {
    res.json({
        "own": {
            "accountId": "rc_account_id",
            "status": req.body.status,
            "perNs": [
                {
                    "productId": "7c0a8a40ba4a47dd899eed51a8fbc3fe",
                    "appId": "fghi45675K7XVUDdFj3eiSRrZK6gYqWQ",
                    "status": req.body.status,
                    "activity": {
                        "value": req.body.activity.value
                    },
                    "ns": req.params.ns,
                    "props": req.body.props,
                    "conns": [
                        {
                            "id": req.params.id,
                            "props": req.body.conn.props
                        }
                    ]
                }
            ]
        }
    });
});

module.exports = app;