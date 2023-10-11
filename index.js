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

// Return now date in case now parameter provided
app.get("/api/", function (req, res) {
  return res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

// Build a full stack JavaScript app that is functionally similar to this:
// https://timestamp-microservice.freecodecamp.rocks.
app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  const isUnix = date.match(/\-/g) ? false : true;
  try {
    if (isUnix) {
      return res.json({
        unix: parseInt(date),
        utc: new Date(parseInt(date)).toUTCString(),
      });
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid Date");
    }
    return res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString(),
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
