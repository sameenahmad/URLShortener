// Initializing db & Express
const db = require("./db/database");
const express = require("express");
const app = express();

//Initializing body-parser
const bodyParser = require("body-parser");
const shortid = require("shortid");
const debug = require("debug")("app");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Initializing routes
const routes = require("./route");
const redirect = require("./redirect");
app.use("/redirect", redirect);
app.use("/api/item", routes);

//Server Listening
app.listen(8000, () => debug("Server listening on port 8000"));
