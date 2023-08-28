const Joi = require("joi").extend(require('@joi/date'));
const {knex} =  require("../utils/knex")


const getAllpromo = async(req,res)=> {
    const userId = req.user.id
    try {
        const promo = await knex('promo').select("*").where({user_id: userId,isactive:true});
        res.json({data: promo})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


const getOnepromo = async(req,res)=> {
    const {id} = req.params
    try {
        const schema = Joi.object({
            id: Joi.number().required()
        });

        const validation = schema.validate({id});
        if (validation.error) {
           return res.status(404).json({message:validation.error.details[0].message});
        }
    const promo = await knex('promo').select("*").where({promo_id: id,user_id:id,isactive:true}).first();
    res.json({data: promo})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


const createPromo = async(req,res)=> {
    const userId = req.user.id
    const {name,price_for_user,company_id,dead_time} = req.body
    try {
        const schema = Joi.object({
            name: Joi.string().max(64).required(),
            company_id: Joi.number().required(),
            dead_time: Joi.date().utc().format(['YYYY/MM/DD', 'YYYY-MM-DD']).required(),
            userId: Joi.number().required(),
            price_for_user: Joi.number().required(),
        });

        const validation = schema.validate({ name,price_for_user,company_id,dead_time,userId });
        if (validation.error) {
           return res.status(404).json({message:validation.error.details[0].message});
        }

        const comp = await knex('company').select("*").where({company_id}).first()
        if(comp.company_id!=company_id) return res.status(404).json({message: "this isn't your company"})
        const newPromo = await knex('promo').insert({name,price_for_user,company_id,user_id:userId,dead_time}).returning("*")
    res.status(201).json({message: "Succesfully created", data: newPromo});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"});
    }
};


const updatepromo = async(req,res)=> {
    const {id} = req.params
    const {name,price_for_user,company_id,dead_time} = req.body
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
            name: Joi.string().max(64).required(),
            company_id: Joi.number().required(),
            dead_time: Joi.date().utc().format(['YYYY/MM/DD', 'YYYY-MM-DD']).required(),
            price_for_user: Joi.number().required(),
        });

        const validation = schema.validate({ id,name,price_for_user,company_id,dead_time });
        if (validation.error) {
           return res.status(404).json({message:validation.error.details[0].message});
        }
        const promo = await knex('promo').select("*").where({promo_id: id,isactive:true}).first();
        if(!promo) return res.json({message: "Invalid promo id"})
        if(promo.company_id != company_id) return res.status(404).json({message: "you can't change this promo"})
        const [data] = await knex("promo")
        .update({name,price_for_user,dead_time})
        .where({promo_id: id})
        .returning("*");
  
      res.json({message: "Success", data});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


const deletepromo = async(req,res)=> {
    try {
        const userId = req.user.id
        const {id} = req.params
        const schema = Joi.object({
            id: Joi.number().required(),
            userId: Joi.number().required()
        });

        const validation = schema.validate({id,userId });
        if (validation.error) {
           return res.status(404).json({message:validation.error.details[0].message});
        }

        const promo = await knex('promo').select("*").where({promo_id: id,isactive:true}).first();
        if(!promo) return res.status(404).json({message: "Can't find this promo"})
        if(promo.user_id != userId) return res.status(404).json({message: "you can't change this promo"}) 
        await knex("promo")
        .update({isactive:false})
        .where({promo_id: id});       
      res.json({message: "Successfully deleted"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}


module.exports = {
    getAllpromo,
    createPromo,
    getOnepromo,
    updatepromo,
    deletepromo
}