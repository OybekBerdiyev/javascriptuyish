const Group = require("../models/groupmodel")
const groupsValidation = require("../validations/group.validation")
const CustomError = require("../utils/custom-error.js")

const createGroup = async (req,res,next)=> {
    try {
        const {group_id,student_id} = req.body;
        const validate = await groupsValidation({group_id,student_id});
        if(validate) throw new CustomError(401,validate);
        const newGroup = await  Group.create({group_id,student_id});
        res.status(201).json({message: "Success",data:newGroup})
    } catch (error) {
        next(error)
    }
}



const updateGroup = async (req,res,next)=> {
    try {
        const id = req.params.id.trim();
        const {group_id,student_id} = req.body;
        await Group.findByIdAndUpdate(id,{group_id,student_id});
        const updgroup = await Group.findById(id);
        res.status(200).json({message: "Success",data:updgroup});
    } catch (error) {
        next(error)
    }
}

const deleteGroup = async (req, res, next) => {
    try {
        const id = req.params.id.trim();
        await Group.findByIdAndUpdate(id,{isActive:false});

        res.json({ message: "Deleted" });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createGroup,
    updateGroup,
    deleteGroup
}