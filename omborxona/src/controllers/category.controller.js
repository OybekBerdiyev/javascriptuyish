const {fetchAll,fetchOne} = require("../utils/pg")
const joi = require("joi")

const getAllCategory = async(req, res)=> {
    try {
        const categores = await fetchAll('select * from categores where isActive=true')
        res.json({data: categores})
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
}

const getOneCategory = async(req, res)=> {
    const {id} = req.params
    try {
        if(!id) return res.json({message: "id is not defined"})
        const service = await fetchOne('select * from categores where category_id=$1 and isActive=true',id)
        res.json({data: service})
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
}


const AddCategory = async (req, res) => {
    const { name} = req.body;
    try {
        const schema = joi.object({
            name: joi.string().max(64).required(),
        });

        const validation = schema.validate({name});
        if (validation.error) {
           return res.status(404).json({message:validation.error.details[0].message});
        }

        const data = await fetchAll(
            "INSERT INTO categores (name) VALUES ($1) RETURNING *",
            name
        );

        res.json({ message: "Service added successfully", data: data });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
};




const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, } = req.body;
    
    try {
        const schema = joi.object({
            name: joi.string().max(64).required(),
        });
        const validation = schema.validate({ name });
        if (validation.error) {
            return res.status(400).json({ message: validation.error.details[0].message });
        }
        const data = await fetchAll(
            "UPDATE categores SET name = $1  WHERE category_id = $2 RETURNING *",
            name , id
        );

        if (data.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ message: "Category updated successfully", data: data });
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
};


const deletecategory = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await fetchOne('SELECT * FROM categores WHERE category_id = $1 AND isactive = true', id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await fetchAll(
            "UPDATE categores SET isactive = false WHERE category_id = $1",
            id
        );

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
};



module.exports =  {
    getAllCategory,
    getOneCategory,
    AddCategory,
    updateCategory,
    deletecategory
}