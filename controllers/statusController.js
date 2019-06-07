//import the crud operation functions
var statusDetails=require('../crudOperations/statusCrud');
var emailController=require('./emailController');
var userDetails=require('../crudOperations/userCrud');


module.exports.createStatusDetails = function(req, res) {
    //params means http://localhost/sample/:data
   // var data={userId:req.params.userId};
    //body means its comming from an object
    var data=req.body;
    statusDetails.createStatus(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"createStatusDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"createStatusDetails",msg);
                userDetails.readUser({id:data.assignedToAdminId},function(err,msg){
                    if(err){
                        console.log('\x1b[31m%s\x1b[0m',"getUserDetails err",err)
                        data.toEmail="";
                    }else{
                        console.log('\x1b[32m%s\x1b[0m',"getUserDetails",msg)
                        data.toEmail=msg[0].emailId;
                        console.log("toEmail",data.toEmail,msg[0].emailId);
                        emailController.emailStatusReport(data,function(err,msg){
                            if(err){
                                console.log('\x1b[31m%s\x1b[0m',"email Status Report err",err)
                            }else{
                                console.log('\x1b[32m%s\x1b[0m',"email Status Report sent",msg);
                            }
                        });
                    }
                });
               
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }


 
module.exports.getStatusDetailsByUserId = function(req, res) {
    //params means http://localhost/sample/:data
    var data={userId:req.params.userId};
    //body means its comming from an object
   // var data=req.body;
   statusDetails.getAllStatusByuserId(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"getStatusDetailsByUserId err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"getStatusDetailsByUserId",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

 
module.exports.getStatusDetailsByAdminId = function(req, res) {
    //params means http://localhost/sample/:data
    var data={assignedToAdminId:req.params.assignedToAdminId};
    //body means its comming from an object
   // var data=req.body;
   statusDetails.getAllStatusByAdminId(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"getStatusDetailsByAdminId err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"getStatusDetailsByAdminId",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }


 
 module.exports.updateStatusByUserDetails = function(req, res) {
    //params means http://localhost/sample/:data
   // var data={userName:req.params.userName};
    //body means its comming from an object
    var data=req.body;
    statusDetails.UpdateStatus(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"updateStatusByUserDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"updateStatusByUserDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }



 module.exports.getStatusByIdDetails = function(req, res) {
    //params means http://localhost/sample/:data
    var data={id:req.params.id};
    //body means its comming from an object
    // var data=req.body;
    statusDetails.getOneStatus(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"updateStatusByUserDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"updateStatusByUserDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }