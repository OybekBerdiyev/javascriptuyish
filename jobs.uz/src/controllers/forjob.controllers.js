const Jobs = require("../database/jobs");

const createjob = async (req, res) => {
  try {
    const {title, description,salary,job_type} = req.body;

    const newJob = new Jobs({title, description,salary,job_type,status:'forjob'});
    await newJob.save();

    res.status(201).json({message: "Success", newJob});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const findjob = async (req, res) => {
  try {

    const data = await Jobs.find();

    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const findOnejob = async (req, res) => {
  try {
    const {id} = req.params;

    const data = await Jobs.findById(id);

    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const updatejob = async (req, res) => {
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
const removejob = async (req, res) => {
  try {
    const {id} = req.params;

    await Jobs.findByIdAndDelete(id);

    res.json({message: "OK"});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

module.exports = {
  createjob,
  findjob,
  findOnejob,
  updatejob,
  removejob,
};
