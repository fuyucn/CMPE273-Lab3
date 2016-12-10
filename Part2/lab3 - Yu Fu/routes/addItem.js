
var ejs = require("ejs");

var soap = require('soap');
var baseURL = "http://localhost:8080/ebayAppServer/services";

//post item into mysql
exports.postItem = function(req,res)
{
	console.log("start add item");

  var name = req.param("itemName");
  var detail = req.param("detail");
  var price = req.param("price");
  var quantity = req.param("quantity");
  var loc = req.param("loc");
  var userid = req.session.uid;
  var json_responses;
  var additem = "INSERT INTO advertisements (name, detail, price,quantity,sellerID,location) values('"+name+"','"+detail+"', '"+price +"','"+quantity +"','" + userid + "','"+ loc+"');";
	console.log("SQL: "+ additem);

    var url = baseURL+"/AddItem?wsdl";
    var args = {sql:additem};
    console.log(JSON.stringify(args));
    soap.createClient(url, function(err, client) {   
        client.addItem(args, function(err, result) 
        {
            console.log(JSON.stringify(result));
            if (result.addItemReturn===false)  
            { 
                json_responses = {"statusCode" : 401};
                res.send(json_responses);
                console.log("throw");
                throw err;
            }
            else
            {
                console.log("valid post item");
                json_responses = {"statusCode" : 200, "uid":req.session.uid};
                res.send(json_responses);
                console.log("item:  POST!");
            }
        });
    });
};

//redirect to additem page
exports.addItem = function(req,res)
{
	if(req.session.uid)
	{
		console.log("start add itempage");
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('addItem', { });
	}
	else {
		res.redirect('/');
	}
};
