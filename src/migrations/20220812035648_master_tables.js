/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('countries', function (table) {
      table.increments('country_id').primary();
      table.string('country_name', 40).notNullable();
    })

    .createTable('states', function (table) {
      table.increments('state_id').primary();
      table.string('state_name', 40).notNullable();
      table
        .integer('country_id')
        .notNullable()
        .references('country_id')
        .inTable('countries');
    })

    .createTable('districts', function (table) {
      table.increments('district_id').primary();
      table.string('district_name', 40).notNullable();
      table
        .integer('state_id')
        .notNullable()
        .references('state_id')
        .inTable('states');
    })

    .createTable('m_role', function (table) {
      table.increments('role_id').primary();
      table.enum('role_name', ['Super Admin', 'Store Admin']);
    })

    .createTable('m_admin', function (table) {
      table.increments('admin_id').primary();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255);
      table.string('email', 255).unique().notNullable();
      table.string('password', 300);
      table
        .integer('role_id')
        .notNullable()
        .references('role_id')
        .inTable('m_role');
      table.string('salt', 300);
      table.string('phone', 300);
      table.integer('country_id').references('country_id').inTable('countries');
      table.integer('state_id').references('state_id').inTable('states');
      table.text('address', 255);
      table.text('image');
      table.boolean('is_active').defaultTo(1);
      table.boolean('is_deleted').defaultTo(0);
      table.integer('updated_by').notNullable;
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })

    .createTable('m_store', function (table) {
      table.increments('store_id').primary();
      table.string('store_name', 255).notNullable();
      table
        .integer('country_id')
        .notNullable()
        .references('country_id')
        .inTable('countries')
        .notNullable();
      table
        .integer('state_id')
        .notNullable()
        .references('state_id')
        .inTable('states')
        .notNullable();
      table
        .integer('district_id')
        .notNullable()
        .references('district_id')
        .inTable('districts')
        .notNullable();
      table.decimal('longitude', 9, 6).notNullable();
      table.decimal('latitude', 8, 6).notNullable();
      table.text('address').notNullable();
      table.string('phone', 300);
      table.string('email', 255);
      table.text('image');
      table.boolean('is_deleted').defaultTo(0);
      table.integer('updated_by');
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })

    .createTable('t_admin_store_map', function (table) {
      table.increments('id').primary();
      table
        .integer('store_id')
        .notNullable()
        .references('store_id')
        .inTable('m_store');
      table
        .integer('admin_id')
        .notNullable()
        .references('admin_id')
        .inTable('m_admin');
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('t_admin_store_map')
    .dropTable('m_store')
    .dropTable('m_admin')
    .dropTable('m_role')
    .dropTable('districts')
    .dropTable('states')
    .dropTable('countries')
};
