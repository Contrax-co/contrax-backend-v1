const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('../users/users-router.js');

const server = express();

const corsConfig = {
  credentials: true,
};

server.use(helmet());
server.use(cors(corsConfig));
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
server.use(express.json());

server.use('/api/users', [logger, usersRouter]);

server.get('/', (req, res) => {
  res.json({ server: 'online' });
});

// Used for troubleshooting. Can comment out if not needed.
// Make sure to remove it from Line 25 if commenting out.
function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

module.exports = server;
