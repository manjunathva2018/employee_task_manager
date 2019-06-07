var mongoose=require('mongoose');
const schema = mongoose.Schema;
//schema
var noteSchema=new mongoose.Schema({
   userId:{
    type:schema.Types.ObjectId, 
    ref: 'user',
    required: true
    },
    message:{
        type:String,
        required:true,
        trim:true
    },
    createdOn:{
        type: Date,
        required: true
    }
  
});
// compile schema to model
module.exports=mongoose.model('noteModel',noteSchema,'notes');