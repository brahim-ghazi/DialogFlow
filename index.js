"use strict";



const express = require("express");
const bodyParser = require("body-parser");

const restService = express();  

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/allumer", function(req, res) {

        var intenisty =
            req.body.result && req.body.result.parameters && req.body.result.parameters.intenisty ? req.body.result.parameters.intenisty : "Seems like some problem. Speak again.";

        var temperature =
            req.body.result && req.body.result.parameters && req.body.result.parameters.temperature ? req.body.result.parameters.temperature : "Seems like some problem. Speak again.";

        if (intenisty == 150 && temperature == 2200) {
            var msgErr = "BlueLignt protection is enable, you cannot apply this command."
            return res.json({
                speech: msgErr,
                displayText: msgErr,
                source: "EchoService"
            });
        }
        else{
          var qs = require("querystring");
var http = require("https");

var options = {
  "method": "POST",
  "hostname": [
    "35",
    "187",
    "176",
    "76"
  ],
  "port": "8243",
  "path": [
    "token"
  ],
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic Mk5ieHIyNl9sd20wVVVFcm5aZUJtVDZOZzI0YTpaZ1ZQMEVSRXJfeDVaZFZnX3JOZlNvMm95SHdh",
    "Cache-Control": "no-cache",
    "Postman-Token": "6e6c1852-e794-d554-b277-764ba64b70b0"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(qs.stringify({ grant_type: 'password',
  username: 'MYLIFI/lamp.dev@yopmail.com',
  password: 'Lamp.dev1' }));
req.end();
        }

        var msg = "The command with temperature " + temperature + " and intenisty " + intenisty + " was applied successfully";
        return res.json({
            speech: msg,
            displayText: msg,
            source: "EchoService"
        });
    
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
