const router = require("express").Router();
const isAuth = require("../middlewares/is-auth.middleware");
const isAdmin = require("../middlewares/is-admin.middleware");
const { createExam, getAllExams,getOneExam,updateExam,deleteExam} = require("../controllers/exam.controller")

router.post("/exam",isAuth,isAdmin,createExam);
router.get("/exam",isAuth,isAdmin,getAllExams);
router.get("/exam/:id",isAuth,isAdmin,getOneExam);
router.put("/exam/:id",isAuth,isAdmin,updateExam);
router.delete("/exam/:id",isAuth,isAdmin,deleteExam);

module.exports = router