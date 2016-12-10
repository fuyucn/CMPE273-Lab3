
var ejs = require("ejs");
var soap = require('soap');
var baseURL = "http://localhost:8080/ebayAppServer/services";

function setup (req, res){
  res.render('login', { title: 'Ebay - Login' });
};

exports.signin = function(req,res) {
  // check user already exists
  var user = req.param("username");
  var pw = req.param("password");

  console.log("user:"+user+", pw:" +pw+" .try to login!");
  var json_responses;
  if (user == undefined || pw == undefined)
  {
    console.log("login info error");
    var json_responses = {"statusCode" : 401};
    res.send(json_responses);
  }else {
    //encrypt
    var crypto = require('crypto');
	var option = {
		ignoredNamespaces : true	
	};
    var url = baseURL+"/Login?wsdl";
	var args = {user:user,password: crypto.createHash('md5').update(pw).digest("hex")};

	 soap.createClient(url,option, function(err, client) {				
	      client.login(args, function(err, result) {
	      	console.log(JSON.stringify(result.loginReturn));
	      	      	
	      	if (parseInt(result.loginReturn.item[1].value.$value)===200)	
	      	{
	            console.log("valid Login");
	            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	            req.session.uid=parseInt(result.loginReturn.item[0].value.$value)
	            json_responses = {"statusCode" : 200};
	            res.send(json_responses);
	            console.log("userid: "+req.session.uid+" Logged!");
	            //  res.end(result);
	      	}
	      	else
	      	{
	            json_responses = {"statusCode" : 401};
	            res.send(json_responses);
	      	}
	      });
	  });
  }
};


exports.index = setup;
