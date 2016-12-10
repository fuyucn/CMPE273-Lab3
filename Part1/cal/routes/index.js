
/*
 * GET home page.
 */
var soap = require('soap');
var baseURL = "http://localhost:8080/calwebserver/services";

exports.index = function(req, res){
  res.render('index', { title: 'Calculator' });
};

exports.cal = function(req,res){
	var option = {
			ignoredNamespaces : true	
		};
	  var url = baseURL+"/Cal?wsdl";
	  var args = {first_num:req.param('first_num'),sec_num: req.param('sec_num'), action:req.param('action')};

	  soap.createClient(url,option, function(err, client) {				
	      client.cal(args, function(err, result) {
	      	if (result.calReturn != undefined)	
	      	{
	      		console.log(result.calReturn);
	      		res.send({statusCode:200,result:result.calReturn});
	      	}
	      	else
	      	{
	      		res.send({statusCode:500,result:0});
	      	}
	      });
	  });
};

 