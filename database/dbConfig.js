const knex = require('knex')({ useNullAsDefault: true });
const knexfile = require('../knexfile.js');
const environment = process.env.NODE_ENV;

module.exports = knex(knexfile[environment]);
