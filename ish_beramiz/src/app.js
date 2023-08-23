const express = require("express")

const router = require("./routes")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const {port} = require("../config")
app.use("/api",router)


app.listen(port,()=> {console.log(port)})