exports.up = function(knex, Promise) {
  return knex.schema.createTable('logger', function (table) {
  	table.biginteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index();
  	// table.biginteger('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index();

    // table.foreign('user_id').references('id').inTable('users');
    table.string('severity');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.string('server_name');
    table.string('message');
    table.string('tag');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('logger');
};


