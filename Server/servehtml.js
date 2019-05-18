const path = require("path");
const express = require("express");
const htmlRouter = express.Router();
const googleauth= require('./googleauth.js')

htmlRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = htmlRouter;
