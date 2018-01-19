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

    var isLogged = false;

    var email = req.body.result.parameters.email;
	var email =
            req.body.result && req.body.result.parameters && req.body.result.parameters.email ? req.body.result.parameters.email : "Email is required.Please enter your Email.";
	if(email != null){
		 email ="Your username is :"+email;
	}
			return res.json({
                speech: email,
                displayText: email,
                source: "EchoService"
            });
/*	else{
		
		var password = req.body.result.parameters.email;
		if(password == null){
			var passwordRequired ="Password is required.Please enter your password"
			return res.json({
					speech: passwordRequired,
					displayText: passwordRequired,
					source: "EchoService"
				});
		}
		else{
			
			var loginSuccess ="your username is "+email " and your password is : "+password;
			return res.json({
					speech: loginSuccess,
					displayText: loginSuccess,
					source: "EchoService"
				});
			
		}
	}*/
    


    if (isLogged) {
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

        var msg = "The command with temperature " + temperature + " and intenisty " + intenisty + " was applied successfully";
        return res.json({
            speech: msg,
            displayText: msg,
            source: "EchoService"
        });
    }
//	esle{
//		 var loginPlease = "Please login first, enter your username";
//		 return res.json({
//            speech: loginPlease,
//            displayText: loginPlease,
//            source: "EchoService"
//        });
//	}
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
