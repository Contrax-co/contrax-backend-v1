const express = require('express');
const cors = require('cors');

const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const favsRouter = require('../favorites/favorites-router.js');

const server = express();

const corsConfig = {
  credentials: true,
};

server.use(helmet());
server.use(express.json());
server.use(cors(corsConfig));
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.use('/api/auth', [authRouter]);
server.use('/api/favorites', [favsRouter]);

server.get('/', (req, res) => {
  res.json({ server: 'online' });
});

// // ** logger middleware for troubleshooting
// // ** for use: uncomment below and add logger to Lines 27-28
// function logger(req, res, next) {
//   console.log(req.method, req.url, Date.now());
//   next();
// }

module.exports = server;
