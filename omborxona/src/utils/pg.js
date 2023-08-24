const { Pool } = require("pg");
const config = require("../../config");

const connectionString = config.db_url
const pool = new Pool({
    connectionString,
});

async function fetchAll(sql, ...params ) {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(sql, params);
        return rows;
    } catch (error) {
        console.log(error.message);
        throw error;
    } finally {
        client.release();
    }
}


async function fetchOne(sql, ...params) {
    const client = await pool.connect();
    try {
        const { rows:[row] } = await client.query(sql, params);
        return row;
    } catch (error) {
        console.log(error.message);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {fetchAll,fetchOne};
