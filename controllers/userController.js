//import the crud operation functions
var userDetails=require('../crudOperations/userCrud');


module.exports.createUserDetails = function(req, res) {
    //params means http://localhost/sample/:data
   // var data={userId:req.params.userId};
    //body means its comming from an object
    var data=req.body;
    userDetails.createUser(data,function(err,msg){
			if(err){
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("createUserDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }


module.exports.getUserDetails = function(req, res) {
    //params means http://localhost/sample/:data
    var data={id:req.params.id};
    //body means its comming from an object
   // var data=req.body;
   userDetails.readUser(data,function(err,msg){
			if(err){
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("getUserDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

 module.exports.getAllUserDetails = function(req, res) {
    //params means http://localhost/sample/:data
    var data={"userType":1};
    //body means its comming from an object
   // var data=req.body;
   userDetails.getAllUser(data,function(err,msg){
			if(err){
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("getAllUserDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

 module.exports.getAllAdminDetails = function(req, res) {
    //params means http://localhost/sample/:data
    var data={"userType":0};
    //body means its comming from an object
   // var data=req.body;
   userDetails.getAllUser(data,function(err,msg){
			if(err){
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("getAllAdminDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }



 module.exports.getUserAuth = function(req, res) {
    //params means http://localhost/sample/:data
    var data={userName:req.params.userName,password:req.params.password};
    //body means its comming from an object
   // var data=req.body;
   userDetails.authUser(data,function(err,msg){
			if(err){
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("getUserAuth",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

 module.exports.updateUserDetails = function(req, res) {
    //params means http://localhost/sample/:data
   // var data={userName:req.params.userName};
    //body means its comming from an object
    var data=req.body;
    userDetails.updateUser(data,function(err,msg){
			if(err){
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("updateUserDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

 module.exports.deleteUserDetails = function(req, res) {
    //params means http://localhost/sample/:data
    var data={id:req.params.userName};
    //body means its comming from an object
    //var data=req.body;
    userDetails.deleteUser(data,function(err,msg){
			if(err){
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("deleteUserDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

