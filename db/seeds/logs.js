
exports.seed = function(knex, Promise) {
  return knex('logger').del()
    .then(function () {
      return Promise.all([
        knex('logger').insert({severity: "info", server_name: "localhost", message: "looks ok"})
      ]);
    });
};