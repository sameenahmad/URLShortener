function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log("Full Name: " + profile.getName());
  console.log("Given Name: " + profile.getGivenName());
  console.log("Family Name: " + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  // Send token to backend
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("id_token:", id_token);
  //document.location.href = "/api/url";
}
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://localhost:5000/api/item");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onload = function() {
  console.log("Signed in as: " + xhr.responseText);
};
xhr.send("idtoken=" + id_token);

/*
async function onSignIn(id_token) {
  try {
    const url = "http://localhost:5000/api/item/";
    var formData = new FormData();
    formData.append("idToken", id_token);
    var request = {
      method: "POST",
      headers: "application/x-www-form-urlencoded",
      body: formData
    };
    await fetch(url, request);
  } catch (error) {
    console.error(error);
  }
}
*/
// Sign the user in, and then retrieve their ID.

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
}
