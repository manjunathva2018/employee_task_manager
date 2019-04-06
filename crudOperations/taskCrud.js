//import mongoose models
var taskModel=require('../models/tasks');
var userModel=require('../models/user');

//export 4 functions i.e create,read,update,delete
module.exports = {
    createTask:createTask,
    getAllTask:getAllTask,
    getOneTask:getOneTask,
    getTaskByUserId:getTaskByUserId,
    updateTask:updateTask
  }

  
  function createTask(data,callback){
    console.log("createTask",data)
    var details = new taskModel();
    details.assignedBy=data.assignedBy;
    details.adminId=data.adminId;
    details.title=data.title;
    details.message=data.message;
    details.priority=data.priority;
    details.assignedOn=data.assignedOn;
    details.assignedToId=data.assignedToId;
    details.toBeCompletedBy=data.toBeCompletedBy;
   
    details.save(function(err,result){
           if(err){
               callback(err,null)
           }else{
               callback(null,result)
           }
   })
 }

 
  function getAllTask(data,callback){
  taskModel.find({"adminId":data.adminId}).populate({ 'model': userModel,'path':'assignedToId','select':'userName'}).exec(function(err,data){
        if(err){
          callback(err,null)
        }else{
          callback(null,data)
        }
      });
    }

    function getTaskByUserId(data,callback){
      taskModel.find({"assignedToId":data.assignedToId},function(err,data){
        if(err){
          callback(err,null)
        }else{
          callback(null,data)
        }
      })
    }

    
 function getOneTask(data,callback){
    taskModel.find({"_id":data.id},function(err,data){
        if(err){
          callback(err,null)
        }else{
          callback(null,data)
        }
      })
    }
  
    
 function updateTask(data,callback){
    console.log("updateTask",data)
    taskModel.findOneAndUpdate({"_id":data._id},{"currentStatus":data.currentStatus,"completedDate":data.completedDate},{upsert: true,new: true}).exec(function(err, data){
         if(err) {
              callback(err,null)
         } else {
             callback(null,data)
           }
       });
     }