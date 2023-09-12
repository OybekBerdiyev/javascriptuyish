const router = require("express").Router()
const {submitExam, getOneExam, checkExam} = require("../controllers/result.controller")
const fileUpload = require ("../middlewares/file-upload.meddliware")
const isAuth = require('../middlewares/is-auth.middleware')
const isAdmin = require('../middlewares/is-admin.middleware')

router.post("/send/exam",fileUpload,submitExam)
router.get("/send/exam/:id",isAuth,isAdmin,getOneExam)
router.get("/result/:id",isAuth,isAdmin,getOneExam)
router.put("/send/exam/:id",isAuth,isAdmin,checkExam)

module.exports = router