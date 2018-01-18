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
    req.body.result &&  req.body.result.parameters && req.body.result.parameters.intenisty ? req.body.result.parameters.intenisty  : "Seems like some problem. Speak again.";
	
  var temperature =
	req.body.result &&  req.body.result.parameters && req.body.result.parameters.temperature ? req.body.result.parameters.temperature  : "Seems like some problem. Speak again.";
	
  if(intenisty == 150 && temperature == 2000){
	  var msgErr = "BlueLignt protection is enable, you cannot apply this command."
	   return res.json({
		speech: msgErr,
		displayText: msgErr,
		source: "webhook-echo-sample"
  }
  
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
