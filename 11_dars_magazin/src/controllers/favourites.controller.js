const Io = require("../utils/Io");
const Favourites = new Io("./database/favourites.json");
const Favourite = require("../models/Favourites.model");


const addToFavorites = async(req,res)=> {
    const userId = req.user.id
    const {id} = req.params;
    const favourites = await Favourites.read()
    const newFavourite = new Favourite(userId,id)
    const data = favourites.length ? [...favourites,newFavourite]:[newFavourite]
    await Favourites.write(data)
    res.status(201).json({message: "Add to Favourites",data:newFavourite})
}
const getToFavourites = async(req,res)=> {
    const favourites = await Favourites.read()
    res.json({data: favourites})
}
const removeToFavourites = async(req,res)=> {
    const favourites = await Favourites.read()
    const {id} = req.params;
    const filter = favourites.filter((product) => product.productId != id);
  
    await Favourites.write(filter);
  
    res.json({message: "Deleted"});
}

module.exports = {
    addToFavorites,
    getToFavourites,
    removeToFavourites
}