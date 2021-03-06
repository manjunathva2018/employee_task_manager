//import mongoose models
var userModel=require('../models/user');

//export 4 functions i.e create,read,update,delete
module.exports = {
    createUser:createUser,
    authUser:authUser,
    getAllUser:getAllUser,
    getByUserType:getByUserType,
    readUser:readUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
    updateLogout:updateLogout
  }

  function createUser(data,callback){
    console.log("createUser",data)
    var details = new userModel();
    details.userName=data.userName;
    details.employeeId=data.employeeId;
    details.emailId=data.emailId;
    details.password=data.password;
    details.dateOfJoining=data.dateOfJoining;
    details.userType=data.userType;
    details.logout=null;
  
    details.save(function(err,result){
           if(err){
               callback(err,null)
           }else{
               callback(null,result)
           }
   })
 }

 function getAllUser(data,callback){
  userModel.find({},function(err,data){
    if(err){
      callback(err,null)
    }else{
      callback(null,data)
    }
  })
  }

  function getByUserType(data,callback){
    userModel.find({"userType":data.userType},function(err,data){
      if(err){
        callback(err,null)
      }else{
        callback(null,data)
      }
    })
  }

 function authUser(data,callback){
  userModel.find({"userName":data.userName,"password":data.password},function(err,data){
      if(err){
        callback(err,null)
      }else{
        callback(null,data)
      }
    })
  }

 function readUser(data,callback){
  userModel.find({"_id":data.id},function(err,data){
      if(err){
        callback(err,null)
      }else{
        callback(null,data)
      }
    })
  }


 function updateUser(data,callback){
    console.log("updateUser",data)
    userModel.findOneAndUpdate({"_id":data.id},{"employeeId":data.employeeId,"emailId":data.emailId,"password":data.password,"userType":data.userType},{upsert: true,new: true}).exec(function(err, data){
         if(err) {
              callback(err,null)
         } else {
             callback(null,data)
           }
       });
     }


     function deleteUser(data,callback){
        console.log("deleteUser",data)
        userModel.deleteOne({ "_id": data.id },
         function (err,data) {
            if(err){
                callback(err,null)
              }else{
                callback(null,data)
              }
         });
     }

     function updateLogout(data,callback){
      console.log("updateLogout",data)
      userModel.findOneAndUpdate({"_id":data.id},{"logout":data.logout}).exec(function(err, data){
           if(err) {
                callback(err,null)
           } else {
               callback(null,data)
             }
         });
       }