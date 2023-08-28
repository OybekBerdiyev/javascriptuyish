const express = require("express")
const app = express()

const {port} = require("../config")
const Router = require("./routers")


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api",Router)

app.listen(port, ()=> {
    console.log(port);
})