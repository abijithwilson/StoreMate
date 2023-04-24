/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('m_size', function (table) {
      table.increments('id').primary();
      table.string('name', 40).notNullable().unique();
    })
    .createTable('m_colour', function (table) {
      table.increments('id').primary();
      table.string('name', 40).notNullable().unique();
      table.string('colour_code', 100).notNullable().unique();
    })
    .createTable('m_category', function (table) {
      table.increments('id').primary();
      table.string('name', 40).notNullable().unique();
      table.text('image');
    })
    .createTable('m_product', function (table) {
      table.increments('id').primary();
      table.string('product_name', 255).notNullable();
      table.text('description').notNullable();
      table
        .integer('category_id')
        .notNullable()
        .references('id')
        .inTable('m_category');
      table.integer('updated_by');
      table.boolean('is_deleted').defaultTo(0).notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('m_sku_table', function (table) {
      table.increments('id').primary();
      table.string('sku_unique_id', 255).notNullable().unique();
      table.decimal('sale_price_discount_percent', 6, 2);
      table.decimal('base_price', 6, 2).notNullable();
      table
        .integer('colour_id')
        .notNullable()
        .references('id')
        .inTable('m_colour');
      table.integer('size_id').notNullable().references('id').inTable('m_size');
      table
        .integer('product_id')
        .notNullable()
        .references('id')
        .inTable('m_product');
      table.bigInteger('barcode').unique();
      table.text('image');
      table.boolean('in_store_availability').defaultTo(1).notNullable();
      table.boolean('default_product').defaultTo(0).notNullable();
      table.integer('updated_by');
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('m_sku_table')
    .dropTable('m_product')
    .dropTable('m_size')
    .dropTable('m_category')
    .dropTable('m_colour');
};
