const Joi = require("joi")

const Io  = require("../utils/Io");
const Services = new Io("./database/services.json");
const Service = require("../models/service.model");


const addService = async(req,res)=>{
    try {
        const photo = req.imageName; 
        const {name,description} = req.body
        
        const schema = Joi.object({
            name: Joi.string().max(40).required(),
            description: Joi.string().min(32).required(),
            photo: Joi.required()
        });
        const {error} = schema.validate({name, description,photo});
        if (error) return res.status(400).json({message: error.message});

        const services = await Services.read()
        const id = (services[services.length - 1]?.id || 0) + 1;

        const newService = new Service(id,name,description,photo);
      
        const data = services.length ? [...services, newService] : [newService];
      
        await Services.write(data);
         
        res.status(201).json({message: "Created"})   

    } catch (error) {
        res.status(500).json({message: "Inernal Server Error"})
    }
}

const oneService = async(req,res)=>{
try {
    const {id} = req.params
    const services = await Services.read()   
    const findService = services.find((a)=> a.id == id)
    if (findService.isActive == true) {
       return res.json({data: findService})
    }else
    return res.status(400).json({message: "Servece not found"})
} catch (error) {
    res.status(500).json({message: "Inernal Server Error"})   
}
}

const allService = async(req,res)=>{
try {
    const services = await Services.read()   
    const filter = services.filter((a) => a.isActive == true);
    res.json({data: filter})
} catch (error) {
    res.status(500).json({message: "Inernal Server Error"})
}
}

const deleteService = async(req,res)=>{
try {
    const {id} = req.params;
    const services = await Services.read()   
    const findService = services.find((a)=> a.id == id)
    findService.isActive = false
    await Services.write(services);
    res.json({message: "Deleted"});
} catch (error) {
    res.status(500).json({message: "Inernal Server Error"})
}
}

const updateService = async(req,res)=>{
try {
    const {id} = req.params;
    const photo = req.imageName; 
    const {name,description} = req.body
    const services = await Services.read() 
    const findService = services.find((a)=> a.id == id)
    if (findService.isActive==false) {
        res.status(400).json({message: "Servece not found"})
    }
    findService.name = name || findService.name
    findService.description = description || findService.description
    findService.photo = photo || findService.photo
    findService.isActive = true || findService.isActive
    await Services.write(services);
    res.json({message: "Updated"});
} catch (error) {
    res.status(500).json({message: "Inernal Server Error"})
}

}


module.exports = {
    allService,
    oneService,
    addService,
    deleteService,
    updateService
}