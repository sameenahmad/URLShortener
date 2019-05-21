const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const shortid = require("shortid");
const model = mongoose.model("model");
const session = require("express-session");
const { OAuth2Client } = require("google-auth-library");
const cliendId =
  "443807417377-p7b0pn5tf12adfj96i5pub3cv029afpa.apps.googleusercontent.com";


  // Creates a user session
router.post("/auth", (req,res)=>{
 const { idToken } = req.body;
 console.log("Token on server", idToken);
  req.session.idToken = idToken;
});


//Checks for user session
router.post("/", (req, res) => {
  if (!req.session.idToken) {
    return res.status(401).send();
  }
  const client = new OAuth2Client(cliendId);
  const userVerify = async function() {
    console.log("userVerify running");
    const result = await verify(idToken, client);
  };


  // Shortens url
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

//verifies token
const verify = async function(token, client) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: [cliendId]
    });
    console.log("Hello, Im ticket", ticket);
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    return userid;
  } catch (err) {
    return err;
  }
};
module.exports = router;
