var mongoose=require('mongoose');
//schema
var userSchema=new mongoose.Schema({
   userName:{
    type: String,
    required:true,
    unique: true
    },
    employeeId:{
        type:String,
        required:true,
        unique: true
    },
    emailId:{
        type:String,
        required:true,
        unique: true
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
    },
    logout:{
        type:Date,
        required:false
    },
    notification:{
        type:Boolean
    }
});
// compile schema to model
module.exports=mongoose.model('userModel',userSchema,'users');