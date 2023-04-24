/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('m_beacon', function (table) {
    table.increments('beacon_id').primary();
    table.string('major_id', 35).notNullable().unique();
    table.string('device_id', 35).notNullable();
    table.integer('minor_id').notNullable();
    table
      .integer('store_id')
      .notNullable()
      .references('store_id')
      .inTable('m_store')
      .notNullable();
    table.string('name', 255).notNullable();
    table.integer('section_id').references('section_id').inTable('m_section');
    table.boolean('status').notNullable().defaultTo(0);
    table.integer('updated_by');
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('m_beacon');
};
