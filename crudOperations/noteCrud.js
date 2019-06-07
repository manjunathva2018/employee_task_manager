//import mongoose models
var noteModel=require('../models/note');

//export 4 functions i.e create,read,update,delete
module.exports = {
    createNote:createNote,
    getAllNotesByUserId:getAllNotesByUserId,
    deleteNote:deleteNote
  }

  function createNote(data,callback){
    console.log("createNote",data)
    var details = new noteModel();
    details.userId=data.userId;
    details.message=data.message;
    details.createdOn=data.createdOn;

    details.save(function(err,result){
           if(err){
               callback(err,null)
           }else{
               callback(null,result)
           }
   })
 }

 function getAllNotesByUserId(data,callback){
    noteModel.find({"userId":data.userId},function(err,data){
      if(err){
        callback(err,null)
      }else{
        callback(null,data)
      }
    })
  }

     function deleteNote(data,callback){
        console.log("deleteNote",data)
        noteModel.deleteOne({ "_id": data.id },
         function (err,data) {
            if(err){
                callback(err,null)
              }else{
                callback(null,data)
              }
         });
     }