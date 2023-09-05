const {v4: uuid} = require("uuid");
const path = require("path");

const fileUpload = (req, res, next) => {
  const file = req.files?.photo;

  if (!file) return res.redirect("http://localhost:4000/register");

  const mimetype = path.extname(file.name);
  const imageName = uuid() + mimetype;

  file.mv(`${process.cwd()}/uploads/${imageName}`);

  req.imageName = imageName;
  next();
};

module.exports = fileUpload;
