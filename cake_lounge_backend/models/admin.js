const { Schema, model } = require("mongoose");

//new schema for admin
const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  prop_pic: {
    type: String,
  },
});

const admin = model("admins", adminSchema);
module.exports = admin;
