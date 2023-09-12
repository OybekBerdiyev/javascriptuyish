const express = require("express")
const app = express()

require("./start/models")(app, express)
require("./start/run")(app)