const {fetchAll,fetchOne} = require("../utils/pg")
const joi = require("joi")

const getAllProducts = async(req, res, next)=> {
    try {
        const products = await fetchAll('select * from products where isActive=true')
        res.json({data: products})
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
}

const getOneProduct = async(req, res, next)=> {
    const {id} = req.params
    try {
        if(!id) return res.json({message: "id is not defined"})
        const service = await fetchOne('select * from products where product_id=$1 and isActive=true',id)
        res.json({data: service})
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
}


const AddProduct = async (req, res, next) => {
    const userId = req.user.id
    const { name, kg, price, category,seel} = req.body;
    
    try {
        const schema = joi.object({
            name: joi.string().max(64).required(),
            seel: joi.boolean().required(),
            kg: joi.number().required(),
            category: joi.number().required(),
            userId: joi.number().required(),
            price: joi.number().required(),
        });

        const validation = schema.validate({ name, seel, kg, category,userId,price });
        if (validation.error) {
           return res.status(404).json({message:validation.error.details[0].message});
        }

        const data = await fetchOne(
            "INSERT INTO products (name, kg, price, category_id) VALUES ($1, $2, $3, $4) RETURNING *",
            name, kg,price, category, 
        );
        const history = await fetchOne(
            "INSERT INTO histories (worker_id, product_id, is_sell, kg,price) VALUES ($1, $2, $3, $4,$5) RETURNING *",
            userId, data.product_id, seel,data.kg,data.price
        );

        res.json({ message: "Product added successfully", data: data });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
};

module.exports = AddProduct;



const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const service = await fetchOne('SELECT * FROM products WHERE product_id = $1 AND isactive = true', id);

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        await fetchAll(
            "UPDATE products SET isactive = false WHERE product_id = $1",
            id
        );

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
};



module.exports =  {
    getAllProducts,
    getOneProduct,
    AddProduct,
    deleteProduct
}