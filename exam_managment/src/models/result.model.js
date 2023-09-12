const { Schema, model } = require("mongoose");
const schem = new Schema(
  {
    exam_id: {
        type: Schema.Types.ObjectId,
        ref: "exam",
        required: true,
      },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
    ball:{
        type: Number,
        default: null
    },
    answer:{
        type: String,
        required: true
    },
    isPass: {
      type: Boolean,
      default: null
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

module.exports = model("result", schem);
