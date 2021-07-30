exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('publicAddress', 42).notNullable().unique();
      // initialize with a random nonce, used to authenticate via meta-auth
      table
        .integer('nonce')
        .notNullable()
        .unsigned()
        .defaultTo(() => Math.floor(Math.random() * 1000000));
      table.string('username', 42).unique();
      table.string('email', 320);
      table.boolean('darkmode').defaultTo(false);
      table.timestamp('timestamp').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('favorites', (table) => {
      table.increments('id');
      table.string('userAddress', 42).notNullable();
      table.string('favAddress', 42).notNullable();
      table.string('favAlias', 42).notNullable();
      table.timestamp('timestamp').notNullable().defaultTo(knex.fn.now());

      table.foreign('userAddress').references('publicAddress').inTable('users');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('favorites');
};
