const { getAllProducts, getOneProduct, AddProduct, deleteProduct } = require("../controllers/product.controller")
const isAuth = require("../middlewares/is-Auth")

const router = require("express").Router()

router.get("/product",isAuth,getAllProducts)
router.get("/product/:id",isAuth,getOneProduct)
router.post("/product",isAuth,AddProduct)
router.delete("/product/:id",isAuth,deleteProduct)

module.exports = router