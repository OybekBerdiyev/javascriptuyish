const { userlogin, userregister } = require("../controllers/auth.controller")
const fileUpload = require("../middleware/file-upload.middleware")

const router = require("express").Router()


router.post("/auth/login",userlogin)
router.post("/auth/register",fileUpload,userregister)


module.exports = router