require("dotenv/config")

const {env} = process
const config = {
    port: env.PORT,
    db_url: env.dbUrl
}

module.exports = config