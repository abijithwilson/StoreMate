/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('m_users', function (table) {
      table.increments('id').primary();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email', 255).unique().notNullable();
      table.date('dob').notNullable();
      table.string('phone', 15);
      table.integer('reward_points_earned');
      table.string('password', 300).notNullable();
      table.string('salt', 300).notNullable();
      table.text('image');
      table.integer('updated_by');
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('m_address', function (table) {
      table.increments('id').primary();
      table.string('address', 255).notNullable();
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
      table
        .integer('user_id')
        .unique()
        .notNullable()
        .references('id')
        .inTable('m_users')
        .onDelete('cascade');
      table.string('locality', 300);
      table.integer('pincode');
      table.integer('updated_by');
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('m_users').dropTable('m_address');
};
