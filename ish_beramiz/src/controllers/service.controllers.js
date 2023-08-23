const {fetchAll,fetchOne} = require("../utils/pg")
const joi = require("joi")

const getAllService = async(req, res, next)=> {
    try {
        const services = await fetchAll('select * from services where isActive=true')
        res.json({data: services})
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
}

const getOneService = async(req, res, next)=> {
    const {id} = req.params
    try {
        if(!id) return res.json({message: "id is not defined"})
        const service = await fetchOne('select * from services where service_id=$1 and isActive=true',id)
        res.json({data: service})
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
}


const Addservice = async (req, res, next) => {
    const userId = req.user.id
    const { filename } = req.file;
    const { title, description,price} = req.body;
    
    try {
        const schema = joi.object({
            title: joi.string().max(64).required(),
            description: joi.string().required(),
            filename: joi.string().required(),
            userId: joi.number().required(),
            price: joi.number().required(),
        });

        const validation = schema.validate({ title, description, filename,userId,price });
        if (validation.error) {
           return res.status(404).json({message:validation.error.details[0].message});
        }

        const data = await fetchAll(
            "INSERT INTO services (title, description, service_photo,users_id,price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            title, description, filename ,userId , price
        );

        res.json({ message: "Service added successfully", data: data });
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
};

module.exports = Addservice;



const updateService = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id
    const { filename } = req.file;
    const { title, description } = req.body;
    
    try {
        const schema = joi.object({
            id: joi.number().integer().positive().required(),
            title: joi.string().max(64).required(),
            description: joi.string().required(),
            filename: joi.string().required()
        });
        const validation = schema.validate({ id, title, description, filename });
        if (validation.error) {
            return res.status(400).json({ message: validation.error.details[0].message });
        }
        const [service] = await fetchOne("SELECT * FROM services WHERE service_id = $1", id);
        if(service.users_id!=userId) return res.json({message: "you can't change this service"})

        const data = await fetchAll(
            "UPDATE services SET title = $1, description = $2, service_photo = $3, users_id=$4 WHERE service_id = $5 RETURNING *",
            title, description, filename, userId, id 
        );

        if (data.length === 0) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json({ message: "Service updated successfully", data: data });
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
};


const deleteService = async (req, res, next) => {
    const { id } = req.params;
    try {
        const service = await fetchOne('SELECT * FROM services WHERE service_id = $1 AND isactive = true', id);

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        await fetchAll(
            "UPDATE services SET isactive = false WHERE service_id = $1",
            id
        );

        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
};



module.exports =  {
    getAllService,
    getOneService,
    Addservice,
    updateService,
    deleteService
}