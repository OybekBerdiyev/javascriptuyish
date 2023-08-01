const Joi = require("joi");


const Io = require("../utils/Io")
const Orders = new Io ("./database/orders.json")
const Order = require("../models/Order.model")
const Products = new Io("./database/products.json");

const addOrder = async(req,res)=> {
    const userId = req.user.id
    const {productId,count, address} = req.body

    const schema = Joi.object({
        productId: Joi.string().required(),
        count: Joi.string().required(),
        address: Joi.string().min(20).required(),
      });

    const {error} = schema.validate({productId, count, address});
    if (error) return res.status(400).json({message: error.message});

    const products = await Products.read()
    const findProduct = products.find((a)=> a.id == productId)
    if (!findProduct || findProduct.count<count) return res.status(403).json({message: "Count not enought"})
    const orders = await Orders.read()
    const price = findProduct.sell;
    const profit = +count * +price
    const neworder = new Order(userId, productId, price, +count, address, profit)
    const data = orders.length ? [...orders ,neworder] : [neworder]
    await Orders.write(data)
    findProduct.count -= count
    await Products.write(products)
    res.json({message: "Ordered"})

}
const getOrder = async(req,res)=> {
    const orders = await Orders.read()
    res.json({orders:orders})
}


module.exports = {
    addOrder,
    getOrder,
}