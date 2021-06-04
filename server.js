const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");

app.post("./shortUrls", (req, res) => {
  // save urls
});
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT || 3000);
