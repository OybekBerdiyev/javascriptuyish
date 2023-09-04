const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    longlink: {
      type: String,
      required: true,
      trim: true,
    },
    shortlink: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("url", schema);
