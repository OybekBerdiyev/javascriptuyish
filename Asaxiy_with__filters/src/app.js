const express = require('express')
const fileUpload = require("express-fileupload");
const { connect } = require('mongoose')
const config = require('../config');
const routes = require('./routes');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())
app.use(express.static(process.cwd()+"/uploads"))
app.use('/api',routes)

const runner = async()=> {
    await connect(config.db_uri)
    app.listen(config.port,()=>{console.log(config.port);})
}

runner()