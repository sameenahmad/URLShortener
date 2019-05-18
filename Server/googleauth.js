const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  153994507565 - r7bljvm8rpc365af886ghcm7fb2bb91o.apps.googleusercontent.com
);
async function verify() {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      [153994507565 -
      r7bljvm8rpc365af886ghcm7fb2bb91o.apps.googleusercontent.com] // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
}
verify().catch(console.error);
