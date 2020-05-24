const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    trim: true
  },
  LastName: {
    type: String,
    required: true,
    trim: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  Password: {
    type: String,
    required: true,
    minLength: 7
  },
  Mobile: {
    type: Number,
    required: true,
    trim: true
  },
  Address: {
    type: String,
    required: true,
    trim: true
  },
  Pincode: {
    type: Number,
    required: true,
    trim: true
  },
  State: {
    type: String,
    required: true,
    trim: true
  },
  Country: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model("student", UserSchema);
