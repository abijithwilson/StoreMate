/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('m_reward', function (table) {
      table.increments('reward_id').primary();
      table.integer('total_points').notNullable();
      table.integer('per_visit_points').notNullable();
      table.integer('total_remaining_points');
      table
        .integer('store_id')
        .notNullable()
        .references('store_id')
        .inTable('m_store')
      table.integer('updated_by');
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })

    .createTable('t_reward_user_track', function (table) {
      table.increments('id').primary();
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('m_users')
        .onDelete('cascade');;
      table
        .integer('store_id')
        .notNullable()
        .references('store_id')
        .inTable('m_store');
      table.integer('reward_points');
      table.date('created_at');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('m_reward')
  .dropTable('t_reward_user_track');
};
