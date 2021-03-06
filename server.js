require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const { generate } = require("./api/bitly");

const app = express();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/urlShortener",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.post("/shortUrls", async (req, res) => {
  // save urls
  await generate(req.body.fullUrl, res);
});

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) {
    return res.sendStatus(404);
  }

  shortUrl.save();
  res.redirect(shortUrl.full);
});

if (process.env.NODE_ENV === "production") {
}

app.listen(process.env.PORT || 3001);
