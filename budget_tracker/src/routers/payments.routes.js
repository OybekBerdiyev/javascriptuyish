const router = require("express").Router()
const { createPayments, UpdPayments} = require("../controllers/payments.controller")
const isAuth = require("../middlewares/isAuth")

router.post("/payments",isAuth,createPayments)
router.put("/payments/:id",isAuth,UpdPayments)

module.exports = router