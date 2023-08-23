const Auth = require("./auth.routes")
const Services = require("./services.routes")
const BuyServices = require("./transfer.routes")

module.exports = [
    Auth,
    Services,
    BuyServices
]