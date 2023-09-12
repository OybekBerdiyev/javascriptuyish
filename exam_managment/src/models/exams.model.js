const { Schema, model } = require("mongoose");
const schem = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    group_id: {
        type: Schema.Types.ObjectId,
        ref: "groupName",
        required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    max_ball: {
        type: Number,
        required:true
    },
    isActive: {
        type: Boolean,
        required:true,
        default:true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("exam", schem);
