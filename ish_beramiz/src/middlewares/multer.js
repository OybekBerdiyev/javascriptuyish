const multer = require("multer");
const { resolve } = require("path");
const { v4: uuid } = require("uuid");

const fileFilter = (req, file, cb,next) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true); 
    } else {
        cb(new Error("Fayl formati noto'g'ri. Faqat PNG yoki JPEG qabul qilinadi."), false); 
    }
};

const xotira = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, resolve('uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, uuid() + '_' + file.originalname);
    }
});

const upload = multer({
    storage: xotira,
    fileFilter: fileFilter
});


module.exports = upload;
