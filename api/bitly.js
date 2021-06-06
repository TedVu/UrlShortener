require("dotenv").config();

const request = require("request");
const ShortUrl = require("../models/shortUrl");

async function generate(urlParams, res) {
  const dataString = `{ "long_url": "${urlParams}", "domain": "bit.ly", "group_guid": "${process.env.BITLY_API_GROUP}" }`;
  const headers = {
    Authorization: `Bearer ${process.env.BITLY_API_TOKEN}`,
    "Content-Type": "application/json",
  };
  const options = {
    url: "https://api-ssl.bitly.com/v4/shorten",
    method: "POST",
    headers: headers,
    body: dataString,
  };
  await request(options, async (error, response, body) => {
    const obj = JSON.parse(body);
    const link = obj.link;
    await ShortUrl.create({ full: urlParams, short: link });
    res.redirect("/");
  });
}

module.exports = {
  generate,
};
