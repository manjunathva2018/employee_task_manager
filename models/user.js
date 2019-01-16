var mongoose=require('mongoose');
//schema
var userSchema=new mongoose.Schema({
   userName:{
    type: String,
    required:true
    },
    employeeId:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
   password:{
       type:String,
       required:true
    },
    dateOfJoining:{
        type:Date,
        required:true
    },
    userType:{
        type:Number,
        required:true
    }
});
// compile schema to model
module.exports=mongoose.model('userModel',userSchema,'users');