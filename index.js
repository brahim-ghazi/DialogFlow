"use strict";



const express = require("express");
const bodyParser = require("body-parser");
const  request = require("request");

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
	

		var options = { 
		  method: 'POST',
		  url: 'https://gateway.dev.mylifi.fr/token',
		  headers: 
		   { 
			 Authorization: 'Basic Mk5ieHIyNl9sd20wVVVFcm5aZUJtVDZOZzI0YTpaZ1ZQMEVSRXJfeDVaZFZnX3JOZlNvMm95SHdh',
			 'Content-Type': 'application/x-www-form-urlencoded' },
		  form: 
		   { grant_type: 'password',
			 username: 'MYLIFI/lamp.dev@yopmail.com',
			 password: 'Lamp.dev1' } };

		request(options, function (error, response, body) {
		  if (error) 
			console.log('--error--'+error)
		
		    var result = JSON.parse(body);
		    var token = result.access_token;
			
			if( token == null){
				 return res.json({
					speech: "Error while trying to connect, please try again",
					displayText: "Error while trying to connect, please try again",
					source: "EchoService"
				});
			}
			else{
				
				var access_Token = 'Bearer '+token;
				console.log('------------access_Token:'+access_Token);
				var optionsWS = { method: 'POST',
				  url: 'https://gateway.dev.mylifi.fr/MCSMylifi/1.0/m3/front/rest/applyTemperatureIntensity',
				  headers: 
				   { 
					 Authorization: access_Token,
					 'Content-Type': 'application/json' },
				  body: 
				   { intensity: intenisty,
					 temperature: temperature,
					 lampUid: 'f5e1dc20-d67f-11e7-a351-f10eafa297d2' },
				  json: true };

				request(optionsWS, function (error, response, body) {
				  if (error)  console.log('--errorWS--'+error)
					  console.log('------------body:'+body.error);
					
					  if(body.error ==  null){
						   
						  var msg = "The command with temperature "+ temperature +" and intenisty "+ intenisty +" was applied successfully" ;
						  return res.json({
							speech: msg,
							displayText: msg,
							source: "EchoService"
						  });
					  }
					  else{
						return res.json({
								speech: "Error while trying to execute command, please check the lamp",
								displayText: "Error while trying to execute command, please check the lamp",
								source: "EchoService"
							});  
					  }
					
				});

				
			}
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
