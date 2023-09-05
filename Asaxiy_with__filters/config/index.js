require("dotenv/config")

const  {env} = process

const config = {
    port: env.PORT,
    db_uri: env.DB_URI
}

module.exports = config