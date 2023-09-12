require("dotenv/config")

const {env} = process;

const config = {
    port: env.PORT || 6000,
    dburl: env.DB_URL,
    jwtsecret: env.JWT_SECRET,
};


module.exports = config
 