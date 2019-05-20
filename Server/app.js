// Initializing db & Express
const db = require("./db/database");
const express = require("express");
const app = express();

//Initializing body-parser, shotid and debug
const bodyParser = require("body-parser");
const shortid = require("shortid");
const debug = require("debug")("app");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,x-access-token,X-Key"
  );

  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Initializing routes
const routes = require("./route");
const htmlRoute = require("./servehtml");
const redirect = require("./redirect");
const login = require("./login");
app.use("/", redirect);
app.use("/api/item", routes);
const path = require("path");
app.use("/api/url", express.static(path.join(__dirname, "../", "public")));
app.use("/api/url", htmlRoute);
console.log('>HTML ROUTE WORKING! TADA')


app.use("/api/signin", express.static(path.join(__dirname, "../", "files")));
app.use("/api/signin", login);

//Server Listening
app.listen(5000, () => debug("Server listening on port 5000"));
