const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByWallet,
};

function find() {
  return db('users').select(
    'id',
    'publicAddress',
    'nonce',
    'username',
    'email',
    'darkmode',
    'timestamp'
  );
}

function findBy(filter) {
  return db('users')
    .select(
      'id',
      'publicAddress',
      'nonce',
      'username',
      'email',
      'darkmode',
      'timestamp'
    )
    .where(filter);
}

function findById(id) {
  return db('users')
    .select(
      'id',
      'publicAddress',
      'nonce',
      'username',
      'email',
      'darkmode',
      'timestamp'
    )
    .where({ id })
    .first();
}

function findByWallet(publicAddress) {
  return db('users')
    .select(
      'id',
      'publicAddress',
      'nonce',
      'username',
      'email',
      'darkmode',
      'timestamp'
    )
    .where({ publicAddress })
    .first();
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}
