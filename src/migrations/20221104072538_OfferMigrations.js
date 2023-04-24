/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('m_offer', function (table) {
      table.increments('offer_id').primary();
      table.decimal('discount_percent', 2, 2);
      table.text('description').notNullable();
      table.string('offer_title', 255).notNullable();
      table.text('image').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.integer('updated_by');
      table.boolean('is_deleted').defaultTo(0).notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.integer('updated_by');
    })
    .createTable('t_product_offer_map', function (table) {
      table.increments('id').primary();
      table
        .integer('offer_id')
        .references('offer_id')
        .inTable('m_offer')
        .notNullable();
      table
        .integer('product_id')
        .references('id')
        .inTable('m_product')
        .notNullable();
      table.unique(['offer_id', 'product_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('m_section');
};
