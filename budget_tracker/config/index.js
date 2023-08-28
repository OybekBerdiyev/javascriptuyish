require("dotenv/config")

const {env} = process

const config = {
    port: env.PORT,
    jwtsecretkey: env.JWT_SECTER_KEY,
    connectionSring: env.connectionSring
}

module.exports = config