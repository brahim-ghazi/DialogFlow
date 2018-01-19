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
	
	if(req.body.lang == "en" || req.body.lang =="en-US"){
	  var intenisty =
		req.body.result &&  req.body.result.parameters && req.body.result.parameters.intenisty ? req.body.result.parameters.intenisty  : "Seems like some problem. Speak again.";
		
	  var temperature =
		req.body.result &&  req.body.result.parameters && req.body.result.parameters.temperature ? req.body.result.parameters.temperature  : "Seems like some problem. Speak again.";
		
	  if(intenisty == 150 && temperature == 2200){
		  var msgErr = "BlueLight protection is enabled, you cannot apply this command."
		   return res.json({
			speech: msgErr,
			displayText: msgErr,
			source: "EchoService"
		 });
	  }
	  
	  var msg = "The command with temperature "+ temperature +" and intenisty "+ intenisty +" was applied successfully" ;
	  return res.json({
		speech: msg,
		displayText: msg,
		source: "EchoService"
	  });
	}  
	
	if(req.body.lang == "fr" || req.body.lang == "fr-fr"){
	  var intenisty =
		req.body.result &&  req.body.result.parameters && req.body.result.parameters.intenisty ? req.body.result.parameters.intenisty  : "On dirait un problème. Répéter SVP.";
		
	  var temperature =
		req.body.result &&  req.body.result.parameters && req.body.result.parameters.temperature ? req.body.result.parameters.temperature  : "On dirait un problème. Répéter SVP.";
		
	  if(intenisty == 150 && temperature == 2200){
		  var msgErr = "BlueLight est activer, vous pouvez pas exécuter cette commande."
		   return res.json({
			speech: msgErr,
			displayText: msgErr,
			source: "EchoService"
		 });
	  }
	  
	  var msg = "La commande avec la température "+ temperature +" et l'intensité "+ intenisty +" a été appliquée avec succès" ;
	  return res.json({
		speech: msg,
		displayText: msg,
		source: "EchoService"
	  });
	}  
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
