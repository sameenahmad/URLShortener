const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const shortid = require("shortid");
const model = mongoose.model("model");
    // The ID token you need to pass to your backend:
       
// converts URL to a shortened URL
router.post("/", (req, res) => {
  const { url } = req.body;
  if (url != null || url != undefined) {
    var result = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (result == null) res.status(500).json({ message: "Enter a valid Url" });
    else {
      var urlcode = shortid.generate(url);
      const urlString = `http://localhost:8000/${urlcode}`;
      var newUrl = new model({
        origUrl: url,
        shortUrl: urlString,
        urlCode: urlcode
      });
      newUrl.save((err, savedUrl) => {
        if (err) return res.status(500).json({ err });
        else {
          res.status(200).json({ message: "Saved Successfully" });
          console.log(savedUrl.shortUrl, savedUrl.urlCode);
        }
      });
    }
  }
});

module.exports = router;
