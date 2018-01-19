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
	else {
		var request = require("request");

		var options = { method: 'POST',
		  url: 'https://35.187.176.76:8243/token',
		  headers: 
		   { 'Postman-Token': 'b5f72a72-eaaf-4ebd-d0e0-ddfce0b8b413',
			 'Cache-Control': 'no-cache',
			 Authorization: 'Basic Mk5ieHIyNl9sd20wVVVFcm5aZUJtVDZOZzI0YTpaZ1ZQMEVSRXJfeDVaZFZnX3JOZlNvMm95SHdh',
			 'Content-Type': 'application/x-www-form-urlencoded' },
		  form: 
		   { grant_type: 'password',
			 username: 'MYLIFI/lamp.dev@yopmail.com',
			 password: 'Lamp.dev1' } };

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
			console.log(response.access_token)
		//  console.log(body);
				 return res.json({
					speech: response.access_token,
					displayText: response.access_token,
					source: "EchoService"
				});
		});
	
	}
       

 /*   var msg = "The command with temperature " + temperature + " and intenisty " + intenisty + " was applied successfully";
    return res.json({
        speech: msg,
        displayText: msg,
        source: "EchoService"
    });
*/
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
