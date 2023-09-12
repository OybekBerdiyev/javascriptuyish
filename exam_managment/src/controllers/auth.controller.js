const CustomError = require("../utils/custom-error");
const { generateToken } = require("../utils/jwt");
const Admin = require("../models/adminModel.models");

const login  = async(req, res, next) => {
    try {
        const {login, password}= req.body;

        const data = await Admin.findOne({login});
        if (!data) throw new CustomError(401, "login  or password incorrect");
        if (data.login!==login) throw new CustomError(401, "login  or password incorrect")

        if (data.password!==password) throw new CustomError(404, "login or password incorrect")


        const token = generateToken({id: data._id});

        res.status(200).send({message: "Success", token: token})
    } catch (error) {
        next(error);
    } 
}
module.exports = {login};