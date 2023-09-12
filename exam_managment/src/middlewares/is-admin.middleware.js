const CustomError = require("../utils/custom-error");
const Admin = require("../models/adminModel.models")

const isAdmin = async (req, res, next) => {
  try {
    const {id} = req.verify;
    const user = await Admin.findById(id);
    if (!user.isAdmin) throw new CustomError("Permission denied", 403);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
