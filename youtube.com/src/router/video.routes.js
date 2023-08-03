const Io = require("../utils/io");
const Videos = new Io(process.cwd()+"/src/database/videos.json");

const createvideo = require("../controllers/video.controllers")
const isAuth = require("../middleware/isAuth.middleware")
const videoUpload = require("../middleware/videoUpload")

const router = require("express").Router()



router.post("/addvideo",isAuth, videoUpload,createvideo)


module.exports = router