//import the crud operation functions
var taskDetails=require('../crudOperations/taskCrud');


module.exports.createTaskDetail = function(req, res) {
    //params means http://localhost/sample/:data
   // var data={userId:req.params.userId};
    //body means its comming from an object
    var data=req.body;
    taskDetails.createTask(data,function(err,msg){
			if(err){
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("createTask",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

 
module.exports.getAllTaskDetail = function(req, res) {
    //params means http://localhost/sample/:data
    var data={adminId:req.params.adminId};
    //body means its comming from an object
   // var data=req.body;
   taskDetails.getAllTask(data,function(err,msg){
			if(err){
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("getAllTaskDetail",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }


 
module.exports.getAllTaskByUserId = function(req, res) {
    //params means http://localhost/sample/:data
    var data={assignedToId:req.params.assignedToId};
    //body means its comming from an object
   // var data=req.body;
   taskDetails.getTaskByUserId(data,function(err,msg){
			if(err){
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log("getAllTaskByUserId",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

