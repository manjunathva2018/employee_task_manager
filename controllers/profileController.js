//import the crud operation functions
var profileDetails=require('../crudOperations/profileCrud');


module.exports.createProfileDetails = function(req, res) {
    //params means http://localhost/sample/:data
   // var data={userId:req.params.userId};
    //body means its comming from an object
    var data=req.body;
    profileDetails.createProfile(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"createProfileDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"createProfileDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }


module.exports.getProfileByUserId = function(req, res) {
    //params means http://localhost/sample/:data
    var data={userId:req.params.userId};
    //body means its comming from an object
   // var data=req.body;
   profileDetails.getByUserId(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"getProfileByUserId err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"getProfileByUserId",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

 module.exports.getAllProfileDetails = function(req, res) {
    //params means http://localhost/sample/:data
    var data={"userType":req.params.userType};
    console.log("data:",data);
    //body means its comming from an object
   // var data=req.body;
   if(data.userType == 0){
    profileDetails.getAll(data,function(err,msg){
        if(err){
            console.log('\x1b[31m%s\x1b[0m',"profileDetails err",err)
            //send status code 400 i.e error with json object
            res.status(400).json({success:false,message:err});
        }else{
            console.log('\x1b[32m%s\x1b[0m',"profileDetails",msg)
             //send status code 200 i.e ok  with json object
            res.status(200).json({success:true,message:msg});
        }
    });
   }else{
      res.status(400).json({success:false,message:"you don`t have required privileges to access the data."});
   }
 }

 
 module.exports.profileUpdateDetails = function(req, res) {
    //params means http://localhost/sample/:data
   // var data={userName:req.params.userName};
    //body means its comming from an object
    var data=req.body;
    profileDetails.updateProfile(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"profileUpdateDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"profileUpdateDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

 module.exports.deleteProfileDetails = function(req, res) {
    //params means http://localhost/sample/:data
    var data={id:req.params.id};
    //body means its comming from an object
    //var data=req.body;
    profileDetails.deleteProfile(data,function(err,msg){
			if(err){
                console.log('\x1b[31m%s\x1b[0m',"deleteProfileDetails err",err)
                //send status code 400 i.e error with json object
				res.status(400).json({success:false,message:err});
			}else{
                console.log('\x1b[32m%s\x1b[0m',"deleteProfileDetails",msg)
                 //send status code 200 i.e ok  with json object
				res.status(200).json({success:true,message:msg});
			}
		});
 }

