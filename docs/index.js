
//Get User ID
gapi.load("auth2", function() {
  auth2 = gapi.auth2.init({
    client_id:
      "153994507565-r7bljvm8rpc365af886ghcm7fb2bb91o.apps.googleusercontent.com",
    fetch_basic_profile: false,
    scope: "profile"
  });
// Send token to backend
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
}
var url = "http://localhost:5000/api/url";
var formData = new FormData();
    formData.append({idToken: id_token});
    var request = {
    method: 'POST',
    headers: headers,
    body: formData
};
fetch(url, request);











  // Sign the user in, and then retrieve their ID.
  auth2.signIn().then(function() {
    console.log(auth2.currentUser.get().getId());
  });
});




function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
}