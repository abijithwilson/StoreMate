/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.raw(`CREATE SEQUENCE barcode_sequence_id
    INCREMENT 1
    MAXVALUE 99999999999
    START 10000000000;`)
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw(`DROP SEQUENCE barcode_sequence_id`) 
};
