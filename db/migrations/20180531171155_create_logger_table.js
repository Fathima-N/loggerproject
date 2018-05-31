exports.up = function(knex, Promise) {
  return knex.schema.createTable('logger', function (table) {
    table.string('severity');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.string('server_name');
    table.string('message');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('logger');
};