require("dotenv/config")

const {env} = process

const config = {
    port: env.PORT || 4000
}

module.exports = config