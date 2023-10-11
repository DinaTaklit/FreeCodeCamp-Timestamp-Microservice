// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Build a full stack JavaScript app that is functionally similar to this:
// https://timestamp-microservice.freecodecamp.rocks.
app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  const isUnix = date.match(/\-/g) ? false : true;
  res.json({
    unix: isUnix ? parseInt(date) : new Date(date).getTime(),
    utc: isUnix
      ? new Date(parseInt(date)).toUTCString()
      : new Date(date).toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
