require("dotenv/config")

const {env} = process

const config = {
    port: env.PORT || 4000 ,
    key: env.secret_key
}

module.exports = config