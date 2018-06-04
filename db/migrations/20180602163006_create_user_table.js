const uuidv4 = require('uuid/v4');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
  	table.increments('id');
  	table.string('company');
  	table.string('email');
  	table.string('password');
  	table.uuid('API key').defaultTo(knex.raw('uuid_generate_v4()'));
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};