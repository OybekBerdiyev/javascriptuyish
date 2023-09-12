const {sign, verify} = require("jsonwebtoken");
const config = require("../../config");

const secret = config.jwtsecret;

const generateToken = (payload) => {
  return sign(payload, secret );
};

const verifyToken = (payload, callback) => {
  return verify(payload, secret, callback);
};

module.exports = {
  generateToken,
  verifyToken,
};
