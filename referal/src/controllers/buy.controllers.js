const { knex } = require("../utils/knex")

buyProduct = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    
    try {
        const { promocode } = req.body;
        const product = await knex('product').select("*").where({ product_id: id }).first();
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        const promo = await knex('promo').select("*").where({ promo_id: product.promo_id }).first();
        
        const history = await knex('promo_history').select('*').where({ user_id: userId, promo_id: promo.promo_id }).first();
        const now = ne Date()
        if (!history || promo.dead_time>now) {
            if (promo.name !== promocode) {
                return res.status(301).json({ message: "Incorrect Promocode" });
            }
            
            const collab = await knex('collabs').select('*').where({ company_id: product.company_id }).first();
            const user = await knex('users').select('*').where({ user_id: collab.user_id, is_collabrator: true }).first();
            
            if (user) {
                const collabuser = await knex('history').select('*').where({ user_id: collab.user_id }).first();
                
                if (collabuser) {
                    await knex('history').update({ user_id: collab.user_id, promo_id: product.promo_id, price: promo.price_for_user });
                } else {
                    await knex('history').insert({ user_id: collab.user_id, promo_id: product.promo_id, price: promo.price_for_user }).returning('*');
                    await knex('promo_history').insert({ user_id: userId, promo_id: promo.promo_id });
                }
                return res.json({ message: "Ok" });
            } else {
                return res.json({ message: "Promo Already registered" });
            }
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {buyProduct}
