const { Schema, model } = require("mongoose");
const schem = new Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: String,
      required: true,
      default:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("groupName", schem);
