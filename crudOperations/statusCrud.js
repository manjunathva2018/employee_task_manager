//import mongoose models
var statusModel=require('../models/status');
var userModel=require('../models/user');

//export 4 functions i.e create,read,update,delete
module.exports = {
    createStatus:createStatus,
    UpdateStatus:UpdateStatus,
    getAllStatusByuserId:getAllStatusByuserId,
    getAllStatusByAdminId:getAllStatusByAdminId,
    getOneStatus:getOneStatus
  }

  
  function createStatus(data,callback){
    console.log("createStatus",data)
    var details = new statusModel();
    details.submitedByUser=data.submitedByUser;
    details.userId=data.userId;
    details.message=data.message;
    details.submittedDate=data.submittedDate;
    details.stage=data.stage;
    details.hourlyStatus=data.hourlyStatus;
    details.assignedToAdminId=data.assignedToAdminId;
    details.fileName=data.fileName;
    details.filePath=data.filePath;
   
    details.save(function(err,result){
           if(err){
               callback(err,null)
           }else{
               callback(null,result)
           }
   })
 }

 
 function getAllStatusByuserId(data,callback){
    statusModel.find({"userId":data.userId}).populate({ 'model': userModel,'path':'assignedToAdminId','select':'userName'}).exec(function(err,data){
      if(err){
        callback(err,null)
      }else{
        callback(null,data)
      }
    });
    }

    function getAllStatusByAdminId(data,callback){
        statusModel.find({"assignedToAdminId":data.assignedToAdminId},function(err,data){
        if(err){
          callback(err,null)
        }else{
          callback(null,data)
        }
      })
    }

    
 function getOneStatus(data,callback){
    statusModel.find({"_id":data.id},function(err,data){
        if(err){
          callback(err,null)
        }else{
          callback(null,data)
        }
      })
    }
  
    
 function UpdateStatus(data,callback){
    console.log("UpdateStatus",data)
    statusModel.findOneAndUpdate({"_id":data.id},{"message":data.message},{upsert: true,new: true}).exec(function(err, data){
         if(err) {
              callback(err,null)
         } else {
             callback(null,data)
           }
       });
     }