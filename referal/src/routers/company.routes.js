const router = require("express").Router()
const isAuth = require("../middlewares/isAuth")
const {getAllCompany, createCompany, getOneCompany, updateCompany, deleteCompany} = require("../controllers/company.controller")

router.get("/company",getAllCompany)
router.post("/company",isAuth,createCompany)
router.get("/company/:id",getOneCompany)
router.put("/company/:id",isAuth,updateCompany)
router.delete("/company/:id",isAuth,deleteCompany)


module.exports = router