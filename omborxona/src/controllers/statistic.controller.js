const { fetchAll } = require("../utils/pg")

const Statistic = async(req,res)=>{
    const history = await fetchAll("select * from histories")
    res.status(200).json({statistic: history})
}

module.exports = Statistic