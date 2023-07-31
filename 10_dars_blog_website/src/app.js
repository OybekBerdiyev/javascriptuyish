const fileUpload = require("express-fileupload");
const express = require("express")

const app = express()
const config = require("../config/index")

const Userrouter = require("./routes/users.routes")
const Postrouter = require("./routes/post.routes")

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(process.cwd() + "/uploads"));
app.use(fileUpload());


app.use(Postrouter)
app.use(Userrouter)
                                                               

app.listen(config.port,()=>{
    console.log(config.port);
})

