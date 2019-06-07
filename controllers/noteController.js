//import the crud operation functions
var noteDetails=require('../crudOperations/noteCrud');

module.exports.createNoteDetails = function(req, res) {
    //params means http://localhost/sample/:data
   // var data={userId:req.params.userId};
    //body means its comming from an object
    var data=req.body;
    noteDetails.createNote(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"createNote err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"createNote",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }


module.exports.getAllNotesDetails = function(req, res) {
    //params means http://localhost/sample/:data
    var data={userId:req.params.userId};
    //body means its comming from an object
   // var data=req.body;
   noteDetails.getAllNotesByUserId(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"getAllNotesDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"getAllNotesDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

 module.exports.deleteNoteDetails = function(req, res) {
    //params means http://localhost/sample/:data
    var data={id:req.params.id};
    //body means its comming from an object
    //var data=req.body;
    noteDetails.deleteNote(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"deleteNoteDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"deleteNoteDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

