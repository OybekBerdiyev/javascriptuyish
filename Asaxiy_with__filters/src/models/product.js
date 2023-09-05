const { Schema, model } = require("mongoose");

const scheme = new Schema({
    name:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    count:{
        type: Number,
        required: true
    },
    is_sale:{
        type: Boolean
    },
    sale_price:{
        type: Number,
        trim: true
    },
},{
    timestamps:true
})


module.exports = model('product',scheme)