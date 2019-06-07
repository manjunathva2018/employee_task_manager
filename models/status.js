var mongoose = require("mongoose");
const schema = mongoose.Schema;
//schema
var statusSchema = new mongoose.Schema({
  submitedByUser: {
    type: String,
    required: true
  },
  userId: {
   type:schema.Types.ObjectId,
     ref: 'user',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  submittedDate: {
    type: Date,
    required: true
  },
  stage: {
    type: String,
    required: true
  },
  hourlyStatus:{
    type:Array
  },
  assignedToAdminId: {
    type:schema.Types.ObjectId, 
    ref: 'user',
    required: true
  },
  fileName: {
    type: String
  },
  filePath: {
    type: String
  },
  viewed:{
    type:Boolean
  }
});
// compile schema to model
module.exports = mongoose.model("statusModel", statusSchema, "status");
