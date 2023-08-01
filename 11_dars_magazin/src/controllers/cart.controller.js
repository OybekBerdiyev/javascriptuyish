const Io = require("../utils/Io");
const Carts = new Io("./database/carts.json");
const Products = new Io("./database/products.json");
const Cart = require("../models/Cart.model");


const addTocart = async(req,res)=> {
    const userId = req.user.id
    const {id} = req.params;
    const carts = await Carts.read()
    const newCart = new Cart(userId,id)
    const data = carts.length ? [...carts,newCart]:[newCart]
    await Carts.write(data)
    res.status(201).json({message: "Add to Cart",data:newCart})
}
const getTocart = async(req,res)=> {
    const carts = await Carts.read()
    res.json({data: carts})
}


const removeTocart = async(req,res)=> {
    const carts = await Carts.read()
    const {id} = req.params;
    const filter = carts.filter((product) => product.productId != id);
  
    await Carts.write(filter);
  
    res.json({message: "Deleted"});
}

module.exports = {
    addTocart,
    getTocart,
    removeTocart
}