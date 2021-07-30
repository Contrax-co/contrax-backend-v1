const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUser,
};

function find() {
  return db('favorites').select(
    'id',
    'userAddress',
    'favAddress',
    'favAlias',
    'timestamp'
  );
}

function findBy(filter) {
  return db('favorites')
    .select('id', 'userAddress', 'favAddress', 'favAlias', 'timestamp')
    .where(filter);
}

function findById(id) {
  return db('favorites')
    .select('id', 'userAddress', 'favAddress', 'favAlias', 'timestamp')
    .where({ id })
    .first();
}

function findByUser(userAddress) {
  return db('favorites')
    .select('id', 'userAddress', 'favAddress', 'favAlias', 'timestamp')
    .where({ userAddress });
}

function add(favorite) {
  return db('favorites')
    .insert(favorite, 'id')
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}
