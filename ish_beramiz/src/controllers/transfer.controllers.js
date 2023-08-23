const joi = require('joi');
const { fetchOne, } = require("../utils/pg");

const BuyService = async (req, res) => {
    const userId = req.user.id;
    const { service_id } = req.params;
    
    try {
        const schema = joi.object({
            userId: joi.number().required(),
            service_id: joi.number().required()
        });

        const validation = await schema.validateAsync({ userId, service_id });
        if (validation.error) {
            return res.status(400).json({ message: validation.error.details[0].message });
        }

        const [service] = await fetchOne("SELECT * FROM services WHERE service_id = $1 AND isactive = true", service_id);
        const [user] = await fetchOne("SELECT * FROM users WHERE users_id = $1", userId);

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        if (user.wallet < service.price) {
            return res.status(403).json({ message: "Balance not enough" });
        }

        await fetchOne("BEGIN");
        await fetchOne("UPDATE users SET wallet = wallet - $1 WHERE users_id = $2", service.price, userId);
        await fetchOne("UPDATE users SET wallet = wallet + $1 WHERE users_id = $2", service.price, service.users_id);
        await fetchOne("COMMIT");
        
        return res.json({ message: "Success" });

    } catch (error) {
        await fetchOne("ROLLBACK");
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = BuyService;
