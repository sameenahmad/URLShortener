const origUrl = document.getElementById("origUrl");
const urlString = document.getElementById("urlString");
const submitBtn = document.getElementById("submitBtn");
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
  const {savedUrl, message} = dataJson;
  console.log(savedUrl)

  return savedUrl;
    
};

submitBtn.addEventListener("click", async() => {
  const url = origUrl.value;
  if (url == undefined) 
  return error;
  else 
  { 
    const link = await shortId(url);
    if(link==undefined)
    {
      return error;
    }
    urlString.style.visibility = "visible";
    urlString.innerHTML = `<a href="${link}" target ="_blank">${link}</a>`;
  }
});
