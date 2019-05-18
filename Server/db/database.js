const mongoose= require('mongoose')
mongoose.connect("mongodb://localhost:27017/urlshortener", { useNewUrlParser: true });
var schema = new mongoose.Schema({ origUrl: "string", shortUrl:"string" ,urlCode:"string" });
var myModel = mongoose.model("model", schema);
console.log('Connected to Mongoose')

module.exports=schema;