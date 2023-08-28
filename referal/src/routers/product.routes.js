const router = require("express").Router()
const { createProduct, getOneproduct, updateproduct, deleteproduct, getAllproduct } = require("../controllers/product.controller")
const isAuth = require("../middlewares/isAuth")

router.get("/product",getAllproduct)
router.post("/product",isAuth,createProduct)
router.get("/product/:id",getOneproduct)
router.put("/product/:id",isAuth,updateproduct)
router.delete("/product/:id",isAuth,deleteproduct)

module.exports = router