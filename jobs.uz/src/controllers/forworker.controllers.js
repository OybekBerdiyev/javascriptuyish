const Jobs = require("../database/jobs");

const createworker = async (req, res) => {
  try {
    const {title, description,salary,job_type} = req.body;

    const newJob = new Jobs({title, description,salary,job_type,status:'forworker'});
    await newJob.save();

    res.status(201).json({message: "Success", newJob});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const findworker = async (req, res) => {
  try {

    const data = await Jobs.find();

    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const findOneworker = async (req, res) => {
  try {
    const {id} = req.params;

    const data = await Jobs.findById(id);

    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const updateworker = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, description,salary,job_type} = req.body;

    const data = await Jobs.findByIdAndUpdate(id, {
      title,
      description,
      salary,
      job_type
    });

    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const removeworker = async (req, res) => {
  try {
    const {id} = req.params;

    await Jobs.findByIdAndDelete(id);

    res.json({message: "OK"});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

module.exports = {
  createworker,
  findworker,
  findOneworker,
  updateworker,
  removeworker,
};
