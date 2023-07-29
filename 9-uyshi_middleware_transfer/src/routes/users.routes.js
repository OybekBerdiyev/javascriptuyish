const middleUser = require("../../middleware/transferMiddle")
const {register, moneyTransfer } = require("../controllers/user")

const router = require("express").Router()

router.post("/register",register)
router.patch("/transfer",middleUser,moneyTransfer)


module.exports = router