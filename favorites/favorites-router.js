const router = require('express').Router();
const Favs = require('./favorites-model.js');

// GET: retrieve all Favorites
router.get('/', (req, res) => {
  Favs.find()
    .then((favs) => {
      res.status(200).json(favs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Server failed to retrieve Favorites',
      });
    });
});

// GET: retrieve a specific Favorite by id
router.get('/:id', (req, res) => {
  Favs.findById(req.params.id)
    .then((fav) => {
      if (fav[0]) {
        res.status(200).json(fav);
      } else {
        res.status(404).json({
          error: 'No match found for the ID provided',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Server failed to retrieve Favorite' });
    });
});

// GET: retrieve all Favorites for a specific User Address
router.get('/:userAddress', (req, res) => {
  Favs.findByUser(req.params.userAddress)
    .then((favs) => {
      if (favs) {
        res.status(200).json(favs);
      } else {
        res.status(404).json({
          error: 'No match found for the address provided',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Server failed to retrieve data for the address provided',
      });
    });
});

// POST: add a new Favorite
router.post('/', (req, res) => {
  Favs.add(req.body)
    .then((fav) => {
      res.status(201).json(fav);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error:
          'Server failed to add Favorite. Check for missing required field(s)',
      });
    });
});

// PUT: update an existing Favorite
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Favs.edit(changes, id)
    .then((count) => {
      if (count === 1) {
        res
          .status(200)
          .json({ message: 'Favorite successfully updated', count });
      } else {
        res.status(404).json({ error: 'No match found for the ID provided' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Server failed to update Favorite' });
    });
});

// DELETE: remove an existing Favorite from the database
router.delete('/:id', (req, res) => {
  Favs.del(req.params.id)
    .then((fav) => {
      if (fav) {
        res.status(200).json({ message: 'Favorite successfully deleted' });
      } else {
        res.status(404).json({
          error: 'No match found for the ID provided',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Server failed to delete Favorite',
      });
    });
});

module.exports = router;
