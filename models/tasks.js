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
       required:true
    },
    assignedOn:{
        type:Date,
        required:true
    },
    assignedToId:{
        type:schema.Types.ObjectId,
        ref: 'user',
        required:true
    }
});
// compile schema to model
module.exports=mongoose.model('taskModel',taskSchema,'tasks');