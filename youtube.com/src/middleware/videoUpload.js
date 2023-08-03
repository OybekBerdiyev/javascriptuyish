const {v4: uuid} = require("uuid");
const path = require("path");

const videoUpload = (req, res, next) => {
  const file = req.files?.video;

  if (!file) return res.redirect("http://localhost:4000/createvideo");

  const mimetype = path.extname(file.name);
  const videoName = uuid() + mimetype;

  file.mv(`${process.cwd()}/uploads/${videoName}`);

  req.videoName = videoName;
  next();
};

module.exports = videoUpload;
