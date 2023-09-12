const nameGroup = require("../models/groups.model")
const Group = require("../models/groupmodel")
const groupsValidation = require("../validations/groupName.validate")
const CustomError = require("../utils/custom-error.js")

const createGroup = async (req,res,next)=> {
    try {
        const {groupName,description} = req.body;
        const validate = await groupsValidation({groupName,description});
        if(validate) throw new CustomError(401,validate);
        const newGroup = await  nameGroup.create({groupName,description});
        res.status(201).json({message: "Success",data:newGroup})
    } catch (error) {
        next(error)
    }
}

const getAllGroup = async (req,res,next)=> {
    try {
        const groups = await nameGroup.find({isActive:true})
        res.status(200).json({message: "Success",data:groups})
    } catch (error) {
        next(error)
    }
}

const getOneGroup = async (req, res, next) => {
    try {
        const { id } = req.params;
        const group = await Group.find({group_id:id,isActive:true}).populate("student_id");

        if (group) {
            res.status(200).json({ message: "Success", data: group });
        } else {
            res.status(404).json({ message: "Group not found" });
        }
    } catch (error) {
        next(error);
    }
};


const updateGroup = async (req,res,next)=> {
    try {
        const id = req.params.id.trim();
        const {groupName,description} = req.body;
        await nameGroup.findByIdAndUpdate(id,{groupName,description});
        const updgroup = await nameGroup.findById(id);
        res.status(200).json({message: "Success",data:updgroup});
    } catch (error) {
        next(error)
    }
}

const deleteGroup = async (req, res, next) => {
    try {
        const id = req.params.id.trim();
        await nameGroup.findByIdAndUpdate(id,{isActive:false});

        res.json({ message: "Deleted" });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createGroup,
    getAllGroup,
    getOneGroup,
    updateGroup,
    deleteGroup
}