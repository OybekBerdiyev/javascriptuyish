const Result = require("../models/result.model");
const Exam = require("../models/exams.model");
const Group = require("../models/groupmodel");
const Student = require("../models/student.model");

const CustomError = require("../utils/custom-error.js");
const resultValidation = require("../validations/result.validation");

const submitExam = async (req, res, next) => {
    try {
        const {exam_id,student_id} = req.body;
        const answer = req.answer
        const exam = await Exam.findOne({_id:exam_id,isActive:true})
        if(!exam) throw new CustomError(404,"Group not found");
        const student = await Student.findOne({_id:student_id,isActive:true})
        if(!student) throw new CustomError(404,"Student not found");
        const group = await Group.findOne({group_id:exam.group_id,student_id});
        if(!group) throw new CustomError(404,"You are not exists this group");
        const validate = await resultValidation({exam_id,student_id,answer});
        if(validate) throw new CustomError(401,validate);
        const newExam = await  Result.create({exam_id,student_id,answer});
        res.status(201).json({message: "Success",data:newExam}); 
    } catch (error) {
        next(error)
    }
}

const getOneExam = async (req,res,next) => {
    try {
        const {id} = req.params;
        const exam = await Result.find({_id:id,isActive:true}).populate("student_id");
        res.json(exam)
    } catch (error) {
        next(error)
    }
}

const checkExam = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { ball, isPass } = req.body;
      const result = await Result.findById(id);
      const exam = await Exam.findOne({ _id: result.exam_id });
      const time = calculateTime(exam.deadline, result.createdAt);
      
      const lateMinutes = Math.max(0, time);
      
      const penalty = lateMinutes / 5 * 5;
      let adjustedBall = Math.max(0, ball - penalty);
      if (adjustedBall<0){
        adjustedBall=0; 
        isPass=false;
      }
      const data = await Result.findByIdAndUpdate(id, { ball: adjustedBall, isPass });
      res.status(201).json({message: "success",data})
    } catch (error) {
      next(error);
    }
  }
  
  function calculateTime(dead, create) {
    const deadline = parseISODate(dead);
    const createdAt = parseISODate(create);
    const differenceInMilliseconds = createdAt - deadline;
    const totalMinutes = Math.abs(differenceInMilliseconds) / (60 * 1000);
    const minutes = Math.floor(totalMinutes);
  
    return minutes;
}
  
  function parseISODate(isoDate) {
    return new Date(isoDate);
}

const getResult = async (req,res,next) => {
    try {
      const { id } = req.params;
      const result = await Result.find({_id:id, isActive:true,isPass: !null}).populate("student_id");  
      res.json({message: "Sucess",data: result})
    } catch (error) {
        next(error)
    }
};

module.exports = {submitExam,getOneExam,checkExam,getResult}