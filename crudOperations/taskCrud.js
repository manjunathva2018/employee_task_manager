//import mongoose models
var taskModel=require('../models/tasks');
var userModel=require('../models/user');

//export 4 functions i.e create,read,update,delete
module.exports = {
    createTask:createTask,
    UpdateTask:UpdateTask,
    getAllTask:getAllTask,
    getOneTask:getOneTask,
    getTaskByUserId:getTaskByUserId
  }

  
  function createTask(data,callback){
    console.log("createTask",data)
    var details = new taskModel();
    details.assignedBy=data.assignedBy;
    details.adminId=data.adminId;
    details.title=data.title;
    details.message=data.message;
    details.assignedOn=data.assignedOn;
    details.assignedToId=data.assignedToId;
   
    details.save(function(err,result){
           if(err){
         console.log("createTask err",err)
               callback(err,null)
           }else{
        console.log("createTask result",result)
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
  
    
 function UpdateTask(data,callback){
    console.log("UpdateTask",data)
    taskModel.findOneAndUpdate({"_id":data.id},{"title":data.title,"message":data.message},{upsert: true,new: true}).exec(function(err, data){
         if(err) {
             console.log("err UpdateTask",err)
              callback(err,null)
         } else {
             callback(null,data)
           console.log("UpdateTask",data)
           }
       });
     }