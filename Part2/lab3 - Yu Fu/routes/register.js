
var ejs = require("ejs");

var soap = require('soap');
var baseURL = "http://localhost:8080/ebayAppServer/services";

/*
 * GET register page.
 */
function index(req,res)
{

  if (req.session.uid){
    res.redirect('/');
  }
  else {
    res.render('register', { title: 'Ebay - Login' });
  }

}


 function register(req,res)
 {
    var username= req.param("username");
    var password= req.param("password");
    var firstname= req.param("firstname");
    var lastname= req.param("lastname");
    var location= req.param("location");
    if (username == undefined || password == undefined || firstname == undefined || lastname ==undefined)
    {
     json_responses = {"statusCode" :401, "userid" : req.session.uid};
     res.send(json_responses);
    }else{
      console.log("good?");
       // check user already exists
       var crypto = require('crypto');
       password=crypto.createHash('md5').update(password).digest("hex");
        var option = {
          ignoredNamespaces : true  
        };
      var url = baseURL+"/Register?wsdl";
      var args = {username:username,password: password,firstname:firstname, lastname:lastname,location:location};
      console.log(JSON.stringify(args));
      soap.createClient(url, function(err, client) {   
          client.reg(args, function(err, result) 
          {
            console.log(JSON.stringify(result));
              if (result.registerReturn===false)  
              { 
                json_responses = {"statusCode" : 401};
                res.send(json_responses);
                res.end(json_responses);

              }
              else
              {
                res.redirect("/login");
              }
          });
      });

    }
}

exports.register=register;
exports.index=index;
