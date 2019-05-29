// Initializing db & Express
const db = require("./db/database");
const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");

//Initializing body-parser, shortid and debug
const bodyParser = require("body-parser");
const shortid = require("shortid");
const debug = require("debug")("app");

//Initializing routes
const routes = require("./route");
const htmlRoute = require("./servehtml");
const redirect = require("./redirect");

//Fixing CORS ERROR
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
const ONE_MINUTE = 1000 * 60 * 60;
SESS_LIFETIME = ONE_MINUTE;
SESS_NAME = "sessionId";
SESS_SECRET = "supersecret";
//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESS_SECRET,
    name: SESS_NAME,
    cookie: { sameSite: true, maxAge: SESS_LIFETIME },
    resave: false,
    saveUninitialized: false
  })
);
app.use("/", redirect);
app.use("/api/item", routes);
app.use("/api/url", express.static(path.join(__dirname, "../", "public")));
app.use("/api/url", htmlRoute);

//Server Listening
app.listen(5000, () => debug("Server listening on port 5000"));
