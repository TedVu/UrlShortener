var request = require("request");

var headers = {
  Authorization: "Bearer 8ef40aa6b56ea0f97ad21889b39db532b4105dd1",
  "Content-Type": "application/json",
};

var dataString =
  '{ "long_url": "https://dev.bitly.com", "domain": "bit.ly", "group_guid": "Bl661ygkjWu" }';

var options = {
  url: "https://api-ssl.bitly.com/v4/shorten",
  method: "POST",
  headers: headers,
  body: dataString,
};

var finalLink = generate();
var link = "";
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    const obj = JSON.parse(body);
    console.log("DEBUG: " + obj.link);
    link = obj.link;
  }
}

function generate() {
  request(options, callback);
  return link;
}

module.exports = {
  generate,
  finalLink,
};
