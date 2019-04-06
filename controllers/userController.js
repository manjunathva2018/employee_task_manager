//import the crud operation functions
var userDetails=require('../crudOperations/userCrud');


module.exports.createUserDetails = function(req, res) {
    //params means http://localhost/sample/:data
   // var data={userId:req.params.userId};
    //body means its comming from an object
    var data=req.body;
    userDetails.createUser(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"createUserDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"createUserDetails",msg)
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
                console.log('\x1b[31m%s\x1b[0m',"getUserDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"getUserDetails",msg)
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
                console.log('\x1b[31m%s\x1b[0m',"getAllUserDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"getAllUserDetails",msg)
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
                console.log('\x1b[31m%s\x1b[0m',"getAllAdminDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"getAllAdminDetails",msg)
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
                console.log('\x1b[31m%s\x1b[0m',"getUserAuth err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"getUserAuth",msg)
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
                console.log('\x1b[31m%s\x1b[0m',"updateUserDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"updateUserDetails",msg)
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
                console.log('\x1b[31m%s\x1b[0m',"deleteUserDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"deleteUserDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

