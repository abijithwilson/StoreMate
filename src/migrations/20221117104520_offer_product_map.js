/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('t_offer_store_map', function (table) {
    table.increments('id').primary();
    table
      .integer('offer_id')
      .notNullable()
      .references('offer_id')
      .inTable('m_offer');
    table
      .integer('store_id')
      .notNullable()
      .references('store_id')
      .inTable('m_store');
    table.unique(['offer_id', 'store_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('t_offer_store_map');
};
