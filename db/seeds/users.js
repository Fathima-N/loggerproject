
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({company: "WeDaBess", email: "a@a.com", password: "aaaa"}),
      ]);
    });
};
