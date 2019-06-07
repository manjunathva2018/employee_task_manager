var mongoose=require('mongoose');
const schema = mongoose.Schema;
//schema
var taskSchema=new mongoose.Schema({
   assignedBy:{
    type: String,
    required:true
    },
    adminId:{
        type:schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    title:{
        type:String
    },
   message:{
       type:String,
       required:true,
       trim:true
    },
    priority:{
        type:String 
    },
    assignedOn:{
        type:Date,
        required:true
    },
    toBeCompletedBy:{
        type:Date
    },
    assignedToId:{
        type:schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    currentStatus:{
        type:String 
    },
    completedDate:{
        type:Date 
    },
    viewed:{
        type:Boolean
    }
});
// compile schema to model
module.exports=mongoose.model('taskModel',taskSchema,'tasks');