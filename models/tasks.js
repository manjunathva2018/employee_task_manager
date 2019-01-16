var mongoose=require('mongoose');
//schema
var taskSchema=new mongoose.Schema({
   assignedBy:{
    type: String,
    required:true
    },
    adminId:{
        type:String,
        required:true
    },
    title:{
        type:String
    },
   message:{
       type:String,
       required:true
    },
    assignedOn:{
        type:Date,
        required:true
    },
    assignedToId:{
        type:String,
        required:true
    }
});
// compile schema to model
module.exports=mongoose.model('taskModel',taskSchema,'tasks');