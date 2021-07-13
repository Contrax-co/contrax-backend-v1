const router = require('express').Router();
const Users = require('./users-model');

// GET: retrieve all Users
router.get('/', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Server failed to retrieve users',
      });
    });
});

// GET: retrieve a specific User by ID aka wallet address
router.get('/:id', (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (user[0]) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          error: 'A user with that ID does not exist',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Server failed to retrieve user' });
    });
});

// POST: add a new User
router.post('/', (req, res) => {
  Users.add(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error:
          'Server could not add user. Check for missing non-nullible field(s).',
      });
    });
});

// PUT: update an existing User
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Users.edit(changes, id)
    .then((count) => {
      if (count === 1) {
        res.status(200).json({ message: 'User updated successfully', count });
      } else {
        res.status(404).json({ error: 'A user with that ID does not exist' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Server failed to update user',
      });
    });
});

// DELETE: remove an existing User from database
router.delete('/:id', (req, res) => {
  Users.del(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({
          error: 'A user with that ID does not exist',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Server failed to delete user',
      });
    });
});

module.exports = router;
