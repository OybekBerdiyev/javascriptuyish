const Workers = require("./workers.routes")
const Auth = require("./auth.routes")
const Products = require("./product.routes")
const Category = require("./categories.routes")
const Statistic = require("./statistic.routes")

module.exports = [Workers,Auth,Products,Category,Statistic]