var mongoose = require("mongoose");
//schema
var statusSchema = new mongoose.Schema({
  submitedByUser: {
    type: String,
    required: true
  },
  userId: {
    type: String,
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
  assignedToAdminId: {
    type: String,
    required: true
  },
  fileName: {
    type: String
  },
  filePath: {
    type: String
  }
});
// compile schema to model
module.exports = mongoose.model("statusModel", statusSchema, "status");
