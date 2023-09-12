const Student = require("../models/student.model");
const studentValidation = require("../validations/student.validation")
const CustomError = require("../utils/custom-error.js")

const createStudent = async (req,res,next)=> {
    try {
        const {studentName,phone} = req.body;
        const validate = await studentValidation({studentName,phone});
        if(validate) throw new CustomError(401,validate);
        const newGroup = await  Student.create({studentName,phone});
        res.status(201).json({message: "Success",data:newGroup})
    } catch (error) {
        next(error)
    }
}

const getAllStudent = async (req,res,next)=> {
    try {
        const student = await Student.find({isActive:true})
        res.status(200).json({message: "Success",data:student})
    } catch (error) {
        next(error)
    }
}

const getOneStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const group = await Student.findOne({_id:id,isActive:true});

        if (group) {
            res.status(200).json({ message: "Success", data: group });
        } else {
            res.status(404).json({ message: "Group not found" });
        }
    } catch (error) {
        next(error);
    }
};


const updateStudent = async (req,res,next)=> {
    try {
        const id = req.params.id.trim();
        const {studentName,phone} = req.body;
        await Student.findByIdAndUpdate(id,{studentName,phone});
        const updgroup = await Student.findById(id);
        res.status(200).json({message: "Success",data:updgroup});
    } catch (error) {
        next(error)
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id.trim();
        await Student.findByIdAndUpdate(id,{isActive:false});
        
        res.json({ message: "Deleted" });
       
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createStudent,
    getAllStudent,
    getOneStudent,
    updateStudent,
    deleteStudent
}