const { connect } = require("mongoose");
const config = require("../../config")

const run = async (app) => {
    await connect(config.dburl);
    app.listen(
        config.port, () => {
            console.log(`Server started port: ${config.port}`);
        }
    )
}

module.exports = run