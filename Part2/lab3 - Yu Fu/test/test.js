var assert = require('assert');
var soap = require('soap');
var baseURL = "http://localhost:8080/ebayAppServer/services";
var ejs = require("ejs");

describe('Array', function() {
  describe('#getItemInfo', function() {
    it('Get item info from db', function() {
	    var itemID = 1;
		var getItem = "SELECT ad.adid, ad.name, ad.detail, ad.price, ad.quantity, ad.location, ad.sellerid, users.firstname, users.lastname FROM advertisements ad INNER JOIN users ON ad.sellerid = users.userid WHERE ad.adID="+itemID+";";

	    var url = baseURL+"/GetItem?wsdl";
	    var args = {sql:getItem};

	    soap.createClient(url, function(err, client) {   
	        client.getItem(args, function(err, result) 
	        {
	            if(err){
	              throw err
	            }
	        });
	    });
    });
  });

   describe('#InsertItem', function() {
    it('InsertItem to db', function() {
   var name = "name";
  var detail = "detail";
  var price = 1;
  var quantity = 2;
  var loc = "loc";
  var userid = 1;

  var additem = "INSERT INTO advertisements (name, detail, price,quantity,sellerID,location) values('"+name+"','"+detail+"', '"+price +"','"+quantity +"','" + userid + "','"+ loc+"');";

    var url = baseURL+"/AddItem?wsdl";
    var args = {sql:additem};
   
    soap.createClient(url, function(err, client) {   
        client.addItem(args, function(err, result) 
        {
            if(err){
              throw err
            }
    	});
    });
  });
 }); 
    describe('#getUserInfo', function() {
    it('Get tUserInfo from db', function() {
     var url = baseURL+"/User?wsdl";
    var args = {userid:1};

    soap.createClient(url, function(err, client) {   
        client.getUserInfo(args, function(err, result) 
        {
            if(err){
              throw err
            }
        });
    });
    });
  });

   describe('#regUser', function() {
    it('reg tUserInfo to db', function() {
	    var username= "username@us";
	    var password= "username";
	    var firstname= "username";
	    var lastname= "username";
	    var location= "username";
		var crypto = require('crypto');
	    password=crypto.createHash('md5').update(password).digest("hex");
	    var url = baseURL+"/Register?wsdl";
	    var args = {username:username,password: password,firstname:firstname, lastname:lastname,location:location};
	    soap.createClient(url, function(err, client) {   
	        client.reg(args, function(err, result) 
	        {
	            if(err){
	              throw err
	            }
	        });
	    });
    });
  });

  describe('#get User sells', function() {
    it('Get User sells from db', function() {
	    var urlSell = baseURL+"/GetUserSells?wsdl";
	    var args = {userid:4};
	    soap.createClient(urlSell, function(err, client) {   
	        client.getusersells(args, function(err, result) 
	        {
	            if(err){
	              throw err
	            }
	        });
	    });
    });
  });
});