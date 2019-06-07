var mongoose = require("mongoose");
//schema
var profileSchema = new mongoose.Schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profileImagePath: {
    type: String
  },
  language: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  alternateNumber: {
    type: String
  },
  jobDesignation: {
    type: String,
    required: true
  },
  workExperience: {
    type: String,
    required: true
  },
  address: {
    type: Schema.Types.Mixed
  },
  aboutYourSelf: {
    type: String
  }
});
// compile schema to model
module.exports = mongoose.model("profileModel", profileSchema, "profiles");
