const Exam = require("../models/exams.model");
// const Student = require("../models")
const examValidation = require("../validations/exam.validation")
const CustomError = require("../utils/custom-error.js")

const createExam = async (req,res,next)=> {
    try {
        const {title,description,group_id,deadline,max_ball} = req.body;
        const validate = await examValidation({title,description,group_id,deadline,max_ball});
        if(validate) throw new CustomError(401,validate);
        const newExam = await  Exam.create({title,description,group_id,deadline,max_ball});
        res.status(201).json({message: "Success",data:newExam})
    } catch (error) {
        next(error)
    }
}

const getAllExams = async (req,res,next)=> {
    try {
        const student = await Exam.find({isActive:true}).populate("group_id")
        res.status(200).json({message: "Success",data:student})
    } catch (error) {
        next(error)
    }
}

const getOneExam = async (req, res, next) => {
    try {
        const { id } = req.params;
        const exam = await Exam.findOne({_id:id,isActive:true}).populate("group_id");

        if (exam) {
            res.status(200).json({ message: "Success", data: exam });
        } else {
            res.status(404).json({ message: "exam not found" });
        }
    } catch (error) {
        next(error);
    }
};

const updateExam = async (req,res,next)=> {
    try {
        const id = req.params.id.trim();
        const {title,description,group_id,deadline,max_ball} = req.body;
        await Exam.findByIdAndUpdate(id,{title,description,group_id,deadline,max_ball});
        const updexam = await Exam.findById(id);
        res.status(200).json({message: "Success",data:updexam});
    } catch (error) {
        next(error)
    }
}

const deleteExam = async (req, res, next) => {
    try {
        const id = req.params.id.trim();
        await Exam.findByIdAndUpdate(id,{isActive:false});
        
        res.json({ message: "Deleted" });
       
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createExam,
    getAllExams,
    getOneExam,
    updateExam,
    deleteExam
}