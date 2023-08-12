const Joi = require("joi")

const Io  = require("../utils/Io")
const Contactes = new Io("./database/users.json")
const Contact = require("../models/contact.model");

const contactUs = async(req,res)=> {
    const {name,number,email,message} = req.body 
 
    const schema = Joi.object({
       name: Joi.string().min(3).max(256).required(),
       number: Joi.string().min(9).max(13).required(),
       email: Joi.string().required(),
       message: Joi.string().min(20).min(32).max(1024).required(),
   });
   const {error} = schema.validate({name,number,email,message});
   if (error) return res.status(400).json({message: error.message});
 
    const contacts = await Contactes.read()
    const id = (contacts[contacts.length - 1]?.id || 0) + 1;
    const status = "waiting"
    const newContact = new Contact(id,name,number,email,message,status);
  
    const data = contacts.length ? [...contacts, newContact] : [newContact];
    await Contactes.write(data);
    res.json({message: "Your message sended"})
 }

 module.exports = contactUs