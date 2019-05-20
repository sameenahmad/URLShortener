const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const shortid = require("shortid");
const model = mongoose.model("model");
const {OAuth2Client} = require("google-auth-library");

// converts URL to a shortened URL

router.post("/", (req, res) => {
  const client = new OAuth2Client("443807417377-p7b0pn5tf12adfj96i5pub3cv029afpa.apps.googleusercontent.com");
  const idToken = req.body;
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience:["443807417377-p7b0pn5tf12adfj96i5pub3cv029afpa.apps.googleusercontent.com"]
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
  }
  verify().catch(console.error);

  const { url } = req.body;
  if (url != null || url != undefined) {
    var result = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (result == null) res.status(500).json({ message: "Enter a valid Url" });
    else {
      var urlcode = shortid.generate(url);
      const urlString = `http://localhost:5000/${urlcode}`;
      var newUrl = new model({
        origUrl: url,
        shortUrl: urlString,
        urlCode: urlcode
      });
      newUrl.save((err, savedUrl) => {
        if (err) return res.status(500).json({ err });
        else {
          return res
            .status(200)
            .json({ message: "Saved Successfully", savedUrl: urlString });
        }
      });
    }
  }
});

module.exports = router;
