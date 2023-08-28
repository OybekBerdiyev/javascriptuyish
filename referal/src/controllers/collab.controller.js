const { knex } = require("../utils/knex");

const AddCollab = async (req, res) => {
    const userId = req.user.id;
    const { company_id, collab_id } = req.params;

    try {
        const company = await knex('company').select('*').where({ company_id, isactive: true }).first();
        if (!company) {
            return res.status(404).json({ message: "Can't find this Company" });
        }
        if (company.user_id !== userId) {
            return res.status(403).json({ message: "You can't change this Company" });
        }

        const user = await knex('users').select('*').where({ user_id: collab_id }).first();
        if (!user || user.is_collabrator === true) {
            return res.json({ message: "User not found or collaborator for another company" });
        }

        const collab = await knex('collabs').insert({ user_id: collab_id, company_id }).returning('*');
        await knex('users').where({ user_id: collab_id }).update({ is_collabrator: true });

        res.status(201).json({ data: collab });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteCollab = async (req, res) => {
    const userId = req.user.id;
    const { id, company_id, collab_id } = req.params;

    try {
        const company = await knex('company').select('*').where({ company_id, isactive: true }).first();
        if (!company) {
            return res.status(404).json({ message: "Can't find this Company" });
        }
        if (company.user_id !== userId) {
            return res.status(403).json({ message: "You can't change this Company" });
        }

        const collab = await knex('collabs').select('*').where({ collab_id: id }).first();
        if (!collab) {
            return res.status(404).json({ message: "Collab not found" });
        }
        if(collab.user_id != collab_id) return res.status(404).json({ message: "User not found" });

        await knex('users').update({ is_collabrator: false }).where({ user_id: collab_id });
        await knex('collabs').del().where({ collab_id: id });

        res.status(200).json({ message: "Collab deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    AddCollab,
    deleteCollab
}