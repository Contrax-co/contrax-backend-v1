exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (users) => {
    users.increments();
    // id = wallet address
    users.string('id', 42).notNullable().unique();
    users.string('name', 42);
    users.string('email', 100);
    users.string('image', 1000);
    // defaults to Light Mode, until User activates Dark Mode
    users.boolean('darkmode').defaultTo(false);
    users.timestamp('last_updated').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
