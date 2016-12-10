
var ejs = require("ejs");
var mysql = require('./mysql');
var soap = require('soap');
var baseURL = "http://localhost:8080/ebayAppServer/services";
/*
 * GET users listing.
 */

exports.list = function(req, res){
  var myID;
  if (!req.param("id"))
  {
    myID =req.session.uid;
    if(myID==undefined)
    {
       res.redirect("/login");
    }
  }
  else {
    myID = req.param("id");
  }

  if(req.session.uid==myID){

    var userInfo= new Array();
    var sellItems= new Array();
    var buyItems= new Array();

    var url = baseURL+"/User?wsdl";
    var args = {userid:req.session.uid};
    console.log("getUser info");


    soap.createClient(url, function(err, client) {   
        client.getUserInfo(args, function(err, result) 
        {
            if(err){
              console.log(err);
            }
            else
            {
              if(result.getUserInfoReturn.length!=undefined){
                var user = "{\"userid\" :\"" +result.getUserInfoReturn[0]+"\",\"firstname\":\""+result.getUserInfoReturn[1]+"\",\"lastname\":\""+result.getUserInfoReturn[2]+"\"}";
                //console.log(userInfo);
                user = JSON.parse(user);
                console.log(user);
                userInfo.push(user);
              }else {
                console.log("No users found in database");
              }
            }
        });
            var urlSell = baseURL+"/GetUserSells?wsdl";
          // get all sells
            soap.createClient(urlSell, function(err, client) {   
              client.getusersells(args, function(err, result) 
              {
               if(err){
                  console.log(err);
                }
                else
                {
                  for( i in result.getusersellsReturn.item){
                    var oneSell = {"adID":result.getusersellsReturn.item[i].value.item[0].value.$value,
                        "price":result.getusersellsReturn.item[i].value.item[1].value.$value,
                        "name":result.getusersellsReturn.item[i].value.item[2].value.$value
                    };
                    sellItems.push(oneSell);
                    console.log(oneSell);
                  }
                }
                              var urlSell = baseURL+"/GetUserBuys?wsdl";
                // get all buys
                  soap.createClient(urlSell, function(err, client) {   
                    client.getuserbuys(args, function(err, result) 
                    {

                        if(err){
                            console.log(err);
                          }
                          else
                          {
                              console.log("Buys:::");
                              //console.log(JSON.parse(result.getuserbuysReturn[0]));
                              for( i in result.getuserbuysReturn)
                                buyItems.push(JSON.parse(result.getuserbuysReturn[i]))
                              res.render('user', {'sells':sellItems, 'buys':buyItems, 'userid':req.session.uid, 'uinfo':userInfo});
                          }
                          
                    });
                  
                  });
               });
              });
         });

    } else {

        res.redirect("/profile/"+myID);
    }
};

exports.profile = function(req,res)
{
  var profileID;
  if (!req.param("id"))
  {
    profileID = req.session.uid;
  }
  else {
    profileID = req.param("id");
  }

	console.log("start profile");
  if(profileID){
    //var getUser = "SELECT userid, firstname, lastname, email,location FROM users WHERE userid="+profileID;
    var url = baseURL+"/GetProfile?wsdl";
    var args = {userid:profileID};
     var userInfo= new Array();
      soap.createClient(url, function(err, client) {   
        client.getProfile(args, function(err, result) 
        {
            if(err){
              console.log(err);
            }
            else
            {
              if(result.getProfileReturn.length!=undefined){
                var user = "{\"userid\" :\"" +result.getProfileReturn[0]+"\",\"firstname\":\""+result.getProfileReturn[1]
                +"\",\"lastname\":\""+result.getProfileReturn[2]+"\",\"email\":\""+result.getProfileReturn[3]
                +"\",\"location\":\""+result.getProfileReturn[4]+"\"}";
                //console.log(userInfo);
                user = JSON.parse(user);
                console.log(user);
                userInfo.push(user);
              }else {
                console.log("No users found in database");
              }
              res.render('profile', {'userid':req.session.uid, 'profileID':profileID,'uinfo':userInfo});
            }
        });
      });
  }else{
    console.log("get profileID error");
    res.redirect('/');
  }
};

//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	console.log("start logout");
	req.session.destroy();
	res.redirect('/');
};
