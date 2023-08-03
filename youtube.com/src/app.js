const express = require("express")
const fileupload = require("express-fileupload")
// const cookie = require("cookie-parser")
const  config  = require("../config/index")
const { home, login, register } = require("./router/home.routes")
const cookie = require("cookie-parser")
const app = express()


app.use(express.urlencoded({extended: true}))
app.use(fileupload())
app.use(cookie())
const authRouter = require("./router/auth.routes")
const getRouter = require("./router/get.routes")
const addvideoRouter = require("./router/video.routes")

app.set("view engine", "ejs")
app.set("views", process.cwd()+"/src/views")
app.use(express.static(process.cwd()+"/uploads"))
app.use(express.static(process.cwd()+"/src/public"))
         
app.get("/",home)
app.get("/login",login)
app.get("/register",register)
app.use("/api",authRouter)
app.use(getRouter)
app.use(addvideoRouter)
          
app.listen(config.port, ()=> {
    console.log(config.port);
})