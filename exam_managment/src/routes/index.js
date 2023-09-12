const Auth = require("./auth.routes");
const createGroup = require("./group.routes");
const Student = require("./student.routes");
const addStudent = require("./grouproutes")
const Exam = require("./exam.routes")
const Result = require("./result.routes")

module.exports = [Auth,createGroup,Student,addStudent,Exam,Result];