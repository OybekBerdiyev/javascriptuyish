const { statistic } = require("../controllers/statistics.controller")
const isAuth = require("../middlewares/isAuth")

const router = require("express").Router()

router.get("/statistics",isAuth,statistic)

module.exports = router