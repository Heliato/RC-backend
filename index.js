const fs = require("fs");
const path = require("path");

console.clear();

global.Username = "";

// Setup Rogue Company
require("./RC/index.js");

// Setup XMPP
require("./xmpp/xmpp.js");