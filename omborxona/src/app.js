const express = require("express")
const app = express()

const config = require("../config")
const router = require("./routers")

app.use(express.json())
app.use("/api",router)

app.listen(config.port, ()=> {
    console.log(config.port);
})