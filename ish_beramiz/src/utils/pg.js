const {Pool} = require("pg")

const pool = new Pool({
    connectionString: 'Your database url'
})

async function fetchAll(sql, ...params) {
    const client = await pool.connect();
    try {
        const {rows} = await client.query(sql, params.length ? params: null);
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
        const {rows: row} = await client.query(sql, params.length ? params: null);
        return row;
    } catch (error) {
        console.log(error.message);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    fetchAll,
    fetchOne
};