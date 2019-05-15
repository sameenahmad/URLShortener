const express = require("express");
var redirect = express.Router();
const mongoose = require("mongoose");
const model = mongoose.model("model");

redirect.get("/:code", (req, res) => {
  const code = req.params.code;
  model.findOne({ urlCode: code }, (err, obj) => {
    if (err) {
      console.error(err);
      res.status(400);
    }
    if (obj != null) {
      const url = obj.origUrl;
      res.redirect(obj.origUrl);
    } else res.status(404).json({ message: "not found" });
  });
});

module.exports = redirect;
