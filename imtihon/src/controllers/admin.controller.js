const Io  = require("../utils/Io")
const Contactes = new Io("./database/users.json")


const getContact = async(req,res)=>{
   const contacts = await Contactes.read()
   const filter = contacts.filter((contact)=> contact.status=="waiting")
   res.json({data: filter})
}


const checkContact = async(req,res)=>{
   const {id} = req.params
   const {desition} = req.body
   const reject = "reject"
   const contacts = await Contactes.read()
   const findContact = contacts.find((a)=> a.id == id)
   if (!findContact || findContact.status== "reject" || findContact.status== "accept") {
      return res.status(404).json({message: "user not found"})
   }
   findContact.status = desition || reject
   await Contactes.write(contacts)
   res.json({message: "Ok"})
}

module.exports = {
   getContact,
   checkContact
}