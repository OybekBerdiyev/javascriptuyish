const router = require("express").Router();
const isAuth = require("../middlewares/is-auth.middleware");
const isAdmin = require("../middlewares/is-admin.middleware");
const { createStudent,getAllStudent,getOneStudent,updateStudent,deleteStudent } = require("../controllers/student.controller");

router.post("/student",isAuth,isAdmin,createStudent);
router.get("/student",isAuth,isAdmin,getAllStudent);
router.get("/student/:id",isAuth,isAdmin,getOneStudent);
router.put("/student/:id",isAuth,isAdmin,updateStudent);
router.delete("/student/:id",isAuth,isAdmin,deleteStudent);

module.exports = router;