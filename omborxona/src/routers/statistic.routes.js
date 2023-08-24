const Statistic = require("../controllers/statistic.controller")
const router = require("./product.routes")

const routter = require("express").Router()

router.get("/statistic",Statistic)

module.exports = routter