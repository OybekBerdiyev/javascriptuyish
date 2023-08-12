const authRouter = require("./auth.routes");
const Services = require("./services.routes");
const Feedbacks = require("./feedback.routes")
const Contact = require("./contact.routes")
const Admin = require("./admin.routes")

module.exports = [
    authRouter,  
    Services,
    Feedbacks,
    Contact,
    Admin
];