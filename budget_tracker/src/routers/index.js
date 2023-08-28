const Auth = require("./auth.routes")
const Payment = require("./payments.routes")
const Earnings = require("./earnings.routes")
const Statistics = require("./statistics.routes")

module.exports = [Auth,Payment,Earnings,Statistics]