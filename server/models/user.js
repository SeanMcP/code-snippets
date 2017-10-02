const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//================================
// User Schema
//================================
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    username: { type: String },
    human: { type: String }
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
},
{
  timestamps: true
});
