//import mongoose models
var statusModel=require('../models/status');

//export 4 functions i.e create,read,update,delete
module.exports = {
    createStatus:createStatus,
    UpdateStatus:UpdateStatus,
    getAllStatusByuserId:getAllStatusByuserId,
    getAllStatusByAdminId:getAllStatusByAdminId
  }

  
  function createStatus(data,callback){
    console.log("createStatus",data)
    var details = new statusModel();
    details.submitedByUser=data.submitedByUser;
    details.userId=data.userId;
    details.message=data.message;
    details.submittedDate=data.submittedDate;
    details.stage=data.stage;
    details.assignedToAdminId=data.assignedToAdminId;
    details.fileName=data.fileName;
    details.filePath=data.filePath;
   
    details.save(function(err,result){
           if(err){
         console.log("createStatus err",err)
               callback(err,null)
           }else{
        console.log("createStatus result",result)
               callback(null,result)
           }
   })
 }

 
 function getAllStatusByuserId(data,callback){
    statusModel.find({"userId":data.userId},function(err,data){
        if(err){
          callback(err,null)
        }else{
          callback(null,data)
        }
      })
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

    
//  function getOneTask(data,callback){
//     taskModel.find({"_id":data.id},function(err,data){
//         if(err){
//           callback(err,null)
//         }else{
//           callback(null,data)
//         }
//       })
//     }
  
    
 function UpdateStatus(data,callback){
    console.log("UpdateStatus",data)
    statusModel.findOneAndUpdate({"_id":data.id},{"message":data.message},{upsert: true,new: true}).exec(function(err, data){
         if(err) {
             console.log("err UpdateStatus",err)
              callback(err,null)
         } else {
             callback(null,data)
           console.log("UpdateStatus",data)
           }
       });
     }