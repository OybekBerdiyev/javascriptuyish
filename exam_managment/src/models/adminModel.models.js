const { Schema, model } = require("mongoose");

const schema = new Schema({
  login: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});
module.exports = model("admin", schema);
