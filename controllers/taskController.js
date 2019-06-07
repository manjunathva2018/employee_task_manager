//import the crud operation functions
var taskDetails=require('../crudOperations/taskCrud');

module.exports.createTaskDetail = function(req, res) {
    //params means http://localhost/sample/:data
   // var data={userId:req.params.userId};
    //body means its comming from an object
    var data=req.body;
    taskDetails.createTask(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"createTaskDetail err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"createTask",msg)
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
                console.log('\x1b[31m%s\x1b[0m',"getAllTaskDetail err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"getAllTaskDetail",msg)
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
                console.log('\x1b[31m%s\x1b[0m',"getAllTaskByUserId err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"getAllTaskByUserId",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

 module.exports.updateSingleTask=function(req,res){
      //params means http://localhost/sample/:data
    var data=req.body;
    //body means its comming from an object
   // var data=req.body;
   taskDetails.updateTask(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"getAllTaskByUserId err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"getAllTaskByUserId",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }


 module.exports.getOneByTaskId=function(req,res){
    //params means http://localhost/sample/:data
    var data={id:req.params.id};
  //body means its comming from an object
 // var data=req.body;
 taskDetails.getOneTask(data,function(err,msg){
          if(err){
              console.log('\x1b[31m%s\x1b[0m',"getOneByTaskId err",err)
              //send status code 400 i.e error with json object
              res.status(400).json({success:false,message:err});
          }else{
              console.log('\x1b[32m%s\x1b[0m',"getOneByTaskId",msg)
               //send status code 200 i.e ok  with json object
              res.status(200).json({success:true,message:msg});
          }
      });
}
