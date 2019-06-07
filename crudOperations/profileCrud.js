//import mongoose models
var profileModel=require('../models/user');
var userModel=require('../models/user');

//export 4 functions i.e create,read,update,delete
module.exports = {
    createProfile:createProfile,
    getAll:getAll,
    getByUserId:getByUserId,
    updateProfile:updateProfile,
    deleteProfile:deleteProfile
  }

  function createProfile(data,callback){
    console.log("createProfile",data)
    var details = new profileModel();
    details.userId=data.userId;
    details.title=data.title;
    details.firstName=data.firstName;
    details.lastName=data.lastName;
    details.profileImagePath=data.profileImagePath;
    details.language=data.language;
    details.qualification=data.qualification;
    details.gender=data.gender;
    details.dateOfBirth=data.dateOfBirth;
    details.mobileNumber=data.mobileNumber;
    details.alternateNumber=data.alternateNumber;
    details.jobDesignation=data.jobDesignation;
    details.workExperience=data.workExperience;
    details.address=data.address;
    details.aboutYourSelf=data.aboutYourSelf;

    details.save(function(err,result){
           if(err){
               callback(err,null)
           }else{
               callback(null,result)
           }
   })
 }

 function getAll(data,callback){
    profileModel.find({}).populate({ 'model': userModel,'path':'userId'}).exec(function(err,data){
      if(err){
        callback(err,null)
      }else{
        callback(null,data)
      }
    })
  }

 function getByUserId(data,callback){
    profileModel.find({"userId":data.userId}).populate({ 'model': userModel,'path':'userId'}).exec(function(err,data){
      if(err){
        callback(err,null)
      }else{
        callback(null,data)
      }
    })
  }


 function updateProfile(data,callback){
    console.log("update profile",data)
    profileModel.findOneAndUpdate({"userId":data.userId},{
    "title":data.title,
    "firstName":data.firstName,
    "lastName":data.lastName,
    "profileImagePath":data.profileImagePath,
    "language":data.language,
    "qualification":data.qualification,
    "gender":data.gender,
    "dateOfBirth":data.dateOfBirth,
    "mobileNumber":data.mobileNumber,
    "alternateNumber":alternateNumber,
    "jobDesignation":data.jobDesignation,
    "workExperience":data.workExperience,
    "address":data.address,
    "aboutYourSelf":data.aboutYourSelf
},{upsert: true,new: true}).exec(function(err, data){
         if(err) {
              callback(err,null)
         } else {
             callback(null,data)
           }
       });
     }


     function deleteProfile(data,callback){
        console.log("deleteProfile",data)
        profileModel.deleteOne({ "_id": data.id },
         function (err,data) {
            if(err){
                callback(err,null)
              }else{
                callback(null,data)
              }
         });
     }