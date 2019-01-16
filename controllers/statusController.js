//import the crud operation functions
var statusDetails=require('../crudOperations/statusCrud');


module.exports.createStatusDetails = function(req, res) {
    //params means http://localhost/sample/:data
   // var data={userId:req.params.userId};
    //body means its comming from an object
    var data=req.body;
    statusDetails.createStatus(data,function(err,msg){
			if(err){
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("createStatusDetails",msg)
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
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("statusDetails by userId",msg)
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
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("statusDetails by adminId",msg)
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
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("updateStatusByUserDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }