const {fetchAll,fetchOne} = require("../utils/pg")
const joi = require("joi")

const getAllworkers = async(req, res, next)=> {
    try {
        const workers = await fetchAll('select * from workers where isActive=true')
        res.json({data: workers})
    } catch (error) {
        next(error)
    }
}

const getOneWorker = async(req, res, next)=> {
    const {id} = req.params
    try {
        if(!id) return res.json({message: "id is not defined"})
        const worker = await fetchOne('select * from workers where worker_id=$1 and isActive=true',id)
        if(worker.length==0) return res.json({message: "User not found"})
        res.json({data: worker})
    } catch (error) {
        
    }
}



const updateWorker = async (req, res) => {  
    try {
        const  userId = req.user.id;
        if(!userId) return res.status(400).json({message: "please log in or register"})
        const { id } = req.params;
        const { fullname, email,password } = req.body;
        const admin = await fetchOne('select * from workers where worker_id=$1 and isActive=true',userId)
        if(!admin.role) return res.json({message: "You hava not permisson"})

        const schema = joi.object({
            id: joi.number().required(),
            fullname: joi.string().max(64).required(),
            email: joi.string().required(),
            password: joi.string().required()
        });

        const validation = schema.validate({ id, fullname, email,password });
        if (validation.error) {
            return res.status(400).json({ message: validation.error.details[0].message });
        }
        const worker = await fetchOne('select * from workers where worker_id=$1 and isActive=true',id)
        if(!worker) return res.status(404).json({message: "Worker not found"})
        const data = await fetchOne(
            "UPDATE workers SET fullname = $1, email = $2, password = $3 WHERE worker_id = $4 RETURNING *",
            fullname, email, password, id
        );

        if (data.length === 0) {
            return res.status(404).json({ message: "worker not found" });
        }

        res.json({ message: "worker updated successfully", data: data });
    } catch (error) {
        console.error(error);
    }
};


const deleteWorker = async (req, res, next) => {
    const { id } = req.params;
    const  userId = req.user.id;
    const admin = await fetchOne('select * from workers where worker_id=$1 and isActive=true',userId)
    
    try {
        if(!userId) return res.status(400).json({message: "please log in or register"})

        if(!admin.role) return res.json({message: "You hava not permisson"})

        const worker = await fetchOne('SELECT * FROM workers WHERE worker_id = $1 AND isactive = true', id);

        if (!worker) {
            return res.status(404).json({ message: "Worker not found" });
        }

        await fetchAll(
            "UPDATE workers SET isactive = false WHERE worker_id = $1",
            id
        );

        res.json({ message: "worker deleted successfully" });
    } catch (error) {
        console.error(error);
        next(error);
    }
};



module.exports =  {
    getAllworkers,
    getOneWorker,
    updateWorker,
    deleteWorker
}