
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}
  // Send token to backend
  function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
  }
  async function onSignIn(id_token)
  var url = "http://localhost:5000/api/url/auth";
  var formData = new FormData();
  formData.append({ idToken: id_token });
  var request = {
    method: "POST",
    headers: headers,
    body: formData
  };
 await fetch(url, request);
  

  
  // Sign the user in, and then retrieve their ID.
 

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
}
