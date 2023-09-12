const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Student", studentSchema);
