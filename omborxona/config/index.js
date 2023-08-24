require("dotenv/config")

const {env} = process

const config = {
    port: env.server_port,
    db_url: env.DB_URL,
    key: env.secretKey
}

module.exports = config