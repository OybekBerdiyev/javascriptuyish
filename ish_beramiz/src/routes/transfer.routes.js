const BuyService = require("../controllers/transfer.controllers")
const isAuth = require("../middlewares/is-Auth.middleware")

const router = require("express").Router()

router.get("/buy/services/:service_id",isAuth,BuyService)


module.exports = router