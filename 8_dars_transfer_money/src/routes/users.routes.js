const {register, moneyTransfer } = require("../controllers/user")

const router = require("express").Router()

router.post("/register",register)
router.patch("/transfer",moneyTransfer)


module.exports = router