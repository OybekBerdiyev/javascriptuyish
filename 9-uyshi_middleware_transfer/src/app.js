const express = require("express")
const app = express()
const  config  = require("../config")

const Userrouter = require("./routes/users.routes")


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(Userrouter)

app.listen(config.port, ()=>{
    console.log(config.port);
} )