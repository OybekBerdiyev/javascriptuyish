const { knex } = require("../utils/knex")
const Joi = require("joi")

const createPayments = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, description, amount } = req.body;
        const schema = Joi.object({
            title: Joi.string().max(64).required(),
            description: Joi.string().required(),
            amount: Joi.number().required()
        });
        const validation = schema.validate({ title, description, amount });
        if (validation.error) {
            return res.status(400).json({ message: validation.error.details[0].message });
        }
        const trx = await knex.transaction()
        try {
            
        const user = await trx('users').select('wallet').where({ user_id: userId }).first(); 
        
        const [payment] = await trx('payments').insert({ title, description, amount, user_id: userId }).returning('*');

        const newWalletBalance = user.wallet - amount

        await trx('users').where({ user_id: userId }).update({ wallet: newWalletBalance });

        await trx('payment_history').insert({ payment_id: payment.payment_id, user_id: userId, amount }).returning('*');

        res.status(201).json({ data: payment });
            await trx.commit()  
        } catch (error) {
            await trx.roolback()
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const UpdPayments = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { title, description, amount } = req.body;
        const schema = Joi.object({
            title: Joi.string().max(64).required(),
            description: Joi.string().required(),
            amount: Joi.number().required()
        });
        const validation = schema.validate({ title, description, amount });
        if (validation.error) {
            return res.status(400).json({ message: validation.error.details[0].message });
        }

            const user = await knex('users').select('*').where({ user_id: userId }).first(); 
            const oldpay = await knex('payments').select('*').where({ payment_id: id }).first();

            if (!oldpay) return res.status(404).json({ message: "Payment not found" });

            const oldWalletBalance = user.wallet + oldpay.amount;
            await knex('users').update({ wallet: oldWalletBalance }).where({ user_id: userId }).returning('*');

            const [payment] = await knex('payments').update({ title, description, amount }).where({ payment_id: id }).returning('*');

            const newWalletBalance = user.wallet - amount;
            await knex('users').where({ user_id: userId }).update({ wallet: newWalletBalance });

            await knex('payment_history').update({ amount }).where({payment_id:id,user_id: userId}).returning('*');

            res.status(201).json({data:payment});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    UpdPayments
};



module.exports = {
    createPayments,
    UpdPayments
}