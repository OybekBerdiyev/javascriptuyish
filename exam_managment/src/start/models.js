const fileUpload = require("express-fileupload");
const routers = require("../routes");
const {errorHandler} = require("../middlewares/error-handler")
// const { swaggerUi, swaggerSpec } = require("../swagger/config");



const modules = (app, express) => {
    app.use(express.json())
    app.use(fileUpload())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(process.cwd() + "/uploads"))
    app.use("/api", routers)
    app.use(errorHandler)
    // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

}


module.exports = modules
