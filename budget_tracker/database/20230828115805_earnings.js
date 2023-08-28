/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('earnings', (table) => {
        table.increments('earning_id').primary().notNullable();
        table.string('title').notNullable();
        table.string('description');
        table.float('amount').notNullable();
        table.boolean('isactive').defaultTo(true);
        table.integer('user_id').unsigned().index().references('user_id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('earnings');
};
