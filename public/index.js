const origUrl = document.getElementById("origUrl");
const urlString = document.getElementById("urlString");
const submitBtn = document.getElementById("submitBtn");
var googleUser = {};
var startApp = function() {
  gapi.load("auth2", function() {
    auth2 = gapi.auth2.init({
      client_id:
        "443807417377-p7b0pn5tf12adfj96i5pub3cv029afpa.apps.googleusercontent.com",
      cookiepolicy: "single_host_origin"
    });
    attachSignin(document.getElementById("customBtn"));
  });
};

function attachSignin(element) {
  console.log(element.id);
  auth2.attachClickHandler(
    element,
    {},
    function(googleUser) {
      document.getElementById("name").innerText =
        "Signed in: " + googleUser.getBasicProfile().getName();
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
      onSignIn(id_token);
    },
    function(error) {
      alert(JSON.stringify(error, undefined, 2));
    }
  );
}
startApp();

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
    document.location.reload(true);
  });
}

async function onSignIn(token) {
  try {
    const data = await fetch("http://localhost:5000/api/item/auth", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idToken: token })
    });
  } catch (error) {
    console.log(error);
  }
}

const shortId = async function fetchUrl(href) {
  console.log(href);
  const data = await fetch("http://localhost:5000/api/item", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: href })
  });

  const dataJson = await data.json();
  console.log(dataJson);
  const { savedUrl, message } = dataJson;
  console.log(savedUrl);

  return savedUrl;
};

submitBtn.addEventListener("click", async () => {
  const url = origUrl.value;
  if (url == undefined) return error;
  else {
    const link = await shortId(url);
    if (link == undefined) {
      return error;
    }
    urlString.style.visibility = "visible";
    urlString.innerHTML = `<a href="${link}" target ="_blank">${link}</a>`;
  }
});
