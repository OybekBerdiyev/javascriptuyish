/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('earning_history',(table)=> {
        table.increments('e_history_id').primary();
        table.float('amount').notNullable();
        table.integer('earning_id').unsigned().index().references('earning_id').inTable('earnings');
        table.integer('user_id').unsigned().index().references('user_id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('history');
};
