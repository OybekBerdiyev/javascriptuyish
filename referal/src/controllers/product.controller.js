const Joi = require("joi");
const {knex} =  require("../utils/knex")


const getAllproduct = async(req,res)=> {
    try {
        const product = await knex('product').select("*").where({isactive:true});
        res.json({data: product})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


const getOneproduct = async(req,res)=> {
    const {id} = req.params
    try {
    const product = await knex('product').select("*").where({product_id: id,isactive:true}).first();
    res.json({data: product})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


const createProduct = async (req, res) => {
    try {
        const userId = req.user.id
        const { name, price, company_id, promo_id } = req.body;
        const comp = await knex('company').select('*').where({company_id, isactive:true}).first()
        if(!comp) return res.json({message: "Company not found"})
        if(comp.user_id!=userId) return res.json("You are not company's worker")
        const newProduct = await knex('product').insert({
            company_id,
            name,
            price,
            promo_id: promo_id ? promo_id : null
        }).returning("*");
        res.status(201).json({ message: "success", data: newProduct });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



const updateproduct = async(req,res)=> {
    const userId = req.user.id
    try {
        const {id} = req.params
        const { name, price, company_id, promo_id } = req.body;
        const comp = await knex('company').select('*').where({company_id, isactive:true}).first()
        if(!comp) return res.json({message: "Company not found"})
        if(comp.user_id!=userId) return res.json("You are not company's worker")

        const product = await knex('product').select("*").where({product_id: id,isactive:true}).first();
        if(!product) return res.json({message: "Invalid id"})

        if(product.company_id != company_id) return res.status(404).json({message: "you can't change this product"})
        const [data] = await knex("product")
        .update({name,price, promo_id: promo_id ? promo_id : null})
        .where({product_id: id})
        .returning("*");
  
      res.json({message: "Success", data});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


const deleteproduct = async(req,res)=> {
    try {
        const {id} = req.params
        const {company_id} = req.body
        const product = await knex('product').select("*").where({product_id: id,isactive:true}).first();
        if(!product) return res.status(404).json({message: "Can't find this product"})
        if(product.company_id != company_id) return res.status(404).json({message: "you can't change this product"}) 
        await knex("product")
        .update({isactive:false})
        .where({product_id: id});       
      res.json({message: "Successfully deleted"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


module.exports = {
    getAllproduct,
    createProduct,
    getOneproduct,
    updateproduct,
    deleteproduct
}