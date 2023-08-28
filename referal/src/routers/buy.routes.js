const router = require("express").Router()
const isAuth = require("../middlewares/isAuth")
const {buyProduct} = require("../controllers/buy.controllers")

router.post("/buy/:id",isAuth,buyProduct)

module.exports = router