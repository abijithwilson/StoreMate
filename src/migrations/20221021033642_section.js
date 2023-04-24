/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('m_section', function (table) {
      table.increments('section_id').primary();
      table.string('section_name', 255).unique().notNullable();
      table.boolean('is_deleted').defaultTo(0);
      table.integer('updated_by');
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.unique('section_name');
    })
    .createTable('t_store_section_map', function (table) {
      table.increments('id').primary();
      table
        .integer('store_id')
        .notNullable()
        .references('store_id')
        .inTable('m_store');
      table
        .integer('section_id')
        .notNullable()
        .references('section_id')
        .inTable('m_section')
        .onDelete('cascade');;
      table.unique(['store_id', 'section_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('m_section').dropTable('t_store_section_map');
};
