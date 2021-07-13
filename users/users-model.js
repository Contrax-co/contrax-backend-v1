const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  add,
  edit,
  del,
};

function find() {
  return db('users').select(
    'id',
    'name',
    'email',
    'image',
    'darkmode',
    'last_updated'
  );
}

function findById(id) {
  return db('users')
    .select('id', 'name', 'email', 'image', 'darkmode', 'last_updated')
    .where({ id });
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

function edit(user, id) {
  return db('users').where({ id }).update(user);
}

function del(id) {
  return db('users').where({ id }).del();
}
