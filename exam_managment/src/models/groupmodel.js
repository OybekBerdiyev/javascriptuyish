const { Schema, model } = require("mongoose");
const schem = new Schema(
  {
    group_id: {
        type: Schema.Types.ObjectId,
        ref: "groupName",
        required: true,
      },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
    isActive: {
      type: Boolean,
      required: true,
      default:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("group", schem);
