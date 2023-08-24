const { getAllCategory, AddCategory, updateCategory, deletecategory, getOneCategory } = require("../controllers/category.controller")
const isAuth = require("../middlewares/is-Auth")

const router = require("express").Router()

router.get("/category",isAuth,getAllCategory)
router.get("/category/:id",isAuth,getOneCategory)
router.post("/category",isAuth,AddCategory)
router.put("/category/:id",isAuth,updateCategory)
router.delete("/category/:id",isAuth,deletecategory)

module.exports = router