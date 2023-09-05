const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    salary:{
      type: String,
      required: true
    },
    job_type:{
      type: String,
      enum: ["online", "offline"],
      required: true
    },
    status:{
      type: String,
      enum: ["forjob", "forworker"],
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Jobs", schema);
