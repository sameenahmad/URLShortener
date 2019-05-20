const path = require("path");
const express = require("express");
const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../files/index.html"));
});
module.exports=loginRouter;


