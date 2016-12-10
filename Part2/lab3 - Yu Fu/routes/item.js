
 var soap = require('soap');
var baseURL = "http://localhost:8080/ebayAppServer/services";
var ejs = require("ejs");

// get item from mysql and show
function getItemById(req,res){
	var itemID = req.param("id");
	console.log("id:"+itemID);
	var getItem = "SELECT ad.adid, ad.name, ad.detail, ad.price, ad.quantity, ad.location, ad.sellerid, users.firstname, users.lastname FROM advertisements ad INNER JOIN users ON ad.sellerid = users.userid WHERE ad.adID="+itemID+";";

	console.log("Query is:"+getItem);

    var url = baseURL+"/GetItem?wsdl";
    var args = {sql:getItem};

    soap.createClient(url, function(err, client) {   
        client.getItem(args, function(err, result) 
        {
            console.log(JSON.stringify(result));
            if (result.getItemReturn!=null)  
            { 

				var jsonParse = JSON.parse(result.getItemReturn);
				console.log(jsonParse);
				var data= new Array();
				data.push(jsonParse);
				res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
				res.render('item', {'data':data, 'userid':req.session.uid});
            }
            else
            {
			     console.log("No users found in database");
					res.render('index', { data:'', userid:req.session.uid });
            }
        });
    });
};

exports.index=getItemById;
