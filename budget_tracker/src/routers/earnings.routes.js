const router = require("express").Router()
const { CreateEarnings, UpdEarning } = require("../controllers/earnings.controller")
const isAuth = require("../middlewares/isAuth")

router.post("/earnings",isAuth,CreateEarnings)
router.put("/earnings/:id",isAuth,UpdEarning)

module.exports = router