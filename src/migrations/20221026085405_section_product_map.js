/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('t_section_product_map', function (table) {
        table.increments('id').primary();
        table
          .integer('store_id')
          .notNullable()
          .references('store_id')
          .inTable('m_store');
        table
          .integer('section_id')
          .references('section_id')
          .inTable('m_section');
          table
          .integer('sku_id')
          .notNullable()
          .references('id')
          .inTable('m_sku_table')
          .inTable('cascade');
          table
          .integer('product_id')
          .notNullable()
          .references('id')
          .inTable('m_product');    
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('t_section_product_map')
  
};
