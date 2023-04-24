/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('t_wishlist_user', function (table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('m_users');
        table
            .integer('product_id')
            .notNullable()
            .references('id')
            .inTable('m_product');
        table
            .integer('store_id')
            .notNullable()
            .references('store_id')
            .inTable('m_store');
        table
            .integer('section_id')
            .notNullable()
            .references('section_id')
            .inTable('m_section');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('t_wishlist_user');
};
