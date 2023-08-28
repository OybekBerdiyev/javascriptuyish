const { knex } = require("../utils/knex");


const statistic = async(req,res) => {
try {
    const userId = req.user.id 
    const user = await knex('users').select('*').where({user_id: userId}).first();
    const earning = await knex('earnings').select('*').where({user_id: userId}).first();
    const payment = await knex('payments').select('*').where({user_id: userId}).first();
    res.json({umumiy: user.wallet,kirim: earning,chiqim:payment})
} catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Internal server error"})
}

}

module.exports = {statistic}