/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('t_section_visit', function (table) {
    table.increments('id').primary();
    table
      .integer('beacon_id')
      .notNullable()
      .references('beacon_id')
      .inTable('m_beacon')
      .onDelete('cascade');
    table.integer('user_id').notNullable().references('id').inTable('m_users');
    table.boolean('entry_status').defaultTo(1);
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
    table.timestamp('entry_date_time').defaultTo(knex.fn.now());
    table.timestamp('exit_date_time');
    table
      .integer('store_id')
      .notNullable()
      .references('store_id')
      .inTable('m_store');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('t_section_visit');
};
