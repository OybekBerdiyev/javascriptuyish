const jwt = require("jsonwebtoken");
const  config  = require("../../config")
const secretKey = config.jwtsecretkey

const sign = (payload) => jwt.sign(payload, secretKey, {expiresIn: "24h"});
const verify = (payload, callback) => jwt.verify(payload, secretKey, callback);

module.exports = {
  sign,
  verify,
};
