const express = require("express");
const http = require('http');
const WebSocket = require("ws");
const uuid = require("uuid");

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

server.listen(80, () => {
    console.log(`Server is listening on port 80`);
});

wss.on("connection", (ws, req) => {
    console.log("Connection established");

    ws.on("message", (msg) => {
        if (Buffer.isBuffer(msg)) msg = msg.toString();
        console.log("Received message: ", msg);

        if (msg.startsWith("CONNECT")) {
            ws.send("CONNECTED\nversion:1.0\n\n\u0000");
            console.log("Sent CONNECTED response");
        }
        else if (msg.startsWith("SUBSCRIBE")) {
            const lines = msg.split("\n");
            let subscriptionId = "";
            let destination = "";

            for (let line of lines) {
                if (line.startsWith("id:"))
                    subscriptionId = line.split(":")[1];

                if (line.startsWith("destination:"))
                    destination = line.split(":")[1];
            }

            const messageId = uuid.v4();
            const response = `MESSAGE\n` +
                `destination:${destination}\n` +
                `subscription:${subscriptionId}\n` +
                `message-id:${messageId}\n` +
                `content-type:application/json\n\n` +
                `{"correlationId":"${uuid.v4()}","timestamp":${new Date().getTime()},"connectionId":"0242acfffe110005-00000001-001758e7-12e332c23df68d3e-b18a1695","type":"core.connect.v1.connected"}\n\u0000`;

            ws.send(response);
            console.log("Sent SUBSCRIBE response with messageId:", messageId);
        }
        else if (msg.startsWith("DISCONNECT")) {
            ws.send("RECEIPT\nreceipt-id:dis-0\n\n\u0000");
            console.log("Sent RECEIPT response");
            ws.close();
        }
    });

    ws.on("close", () => {
        console.log("Connection closed");
    });

    ws.on("error", (err) => {
        console.error("WebSocket error: ", err);
    });
});
