const Url = require("../database/urls");
const randomstring = require("randomstring");


const generateurl = async (req, res) => {
  try {
    const data = await Url.find()
    const {url} = req.body;
    const shortlink = `${randomstring.generate(5)}${data.length}`;
    const newUrl = new Url({longlink:url,shortlink});
    await newUrl.save();
    res.status(201).json({message: "Success",url:`localhost:4000/${newUrl.shortlink}`});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

const geturl = async (req,res)=> { 
try {
    const {url} = req.params
    const data = await Url.findOne({shortlink: url});
    if(data) return res.status(404).json({message:"Short url not found"})
    res.redirect(data.longlink)
} catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
}
}


module.exports = {generateurl,geturl}