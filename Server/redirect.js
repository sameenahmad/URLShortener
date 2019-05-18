const express = require("express");
var redirect = express.Router();
const mongoose = require("mongoose");
const model = mongoose.model("model");

redirect.get("/:code", (req, res) => {
  const code = req.params.code;
  model.findOne({ urlCode: code }, (err, obj) => {
    if (err) {
      console.error(err);
      return res.status(400);
    }
    if (obj) {
      const url = obj.origUrl;
      if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0)
        return res.redirect(url);
      else return res.redirect("https://" + url);
    } else return res.status(404).json({ message: "not found", obj });
  });
});

module.exports = redirect;
