const Joi = require("joi");
const {knex} =  require("../utils/knex")


const getAllCompany = async(req,res)=> {
    try {
        const company = await knex('company').select("*").where({isactive:true});
        res.json({data: company})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


const getOneCompany = async(req,res)=> {
    const {id} = req.params
    try {
    const company = await knex('company').select("*").where({company_id: id,isactive:true}).first();
    res.json({data: company})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


const createCompany = async(req,res)=> {
    try {
        const user_Id = req.user.id
        const {name} = req.body
        const company = await knex('company').select("*").where({name,isactive:true}).first();
        if(company) return res.status(401).json({message: "Company name already exists"})
        const newComp = await knex('company').insert({name,user_id:user_Id}).returning("*")
    res.status(201).json({message: "succes", data: newComp})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


const updateCompany = async(req,res)=> {
    try {
        const {id} = req.params
        const user_Id = req.user.id
        const {name} = req.body
        const company = await knex('company').select("*").where({company_id: id,isactive:true}).first();
        if(company.user_id != user_Id) return res.status(404).json({message: "you can't change this Company"})
        const [data] = await knex("company")
        .update({name})
        .where({company_id: id})
        .returning("*");
  
      res.json({message: "Success", data});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


const deleteCompany = async(req,res)=> {
    try {
        const {id} = req.params
        const user_Id = req.user.id
        const company = await knex('company').select("*").where({company_id: id,isactive:true}).first();
        if(!company) return res.status(404).json({message: "Can't find this Company"})
        if(company.user_id != user_Id) return res.status(404).json({message: "you can't change this Company"}) 
        await knex("company")
        .update({isactive:false})
        .where({company_id: id});       
      res.json({message: "Successfully deleted"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}






module.exports = {
    getAllCompany,
    createCompany,
    getOneCompany,
    updateCompany,
    deleteCompany
}