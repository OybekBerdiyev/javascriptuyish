const Auth = require('./auth.routes')
const Company = require('./company.routes')
const Product = require('./product.routes')
const Promo = require('./promo.routes')
const Collab = require('./collab.routes')
const Buy = require('./buy.routes')

module.exports = [Auth,Company,Product,Promo,Collab,Buy]