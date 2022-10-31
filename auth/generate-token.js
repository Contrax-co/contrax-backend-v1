const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets');

module.exports = function generateToken(user) {
  const payload = {
    subject: user.id,
    publicAddress: user.publicAddress,
    nonce: user.nonce,
    username: user.username,
    email: user.email,
    darkmode: user.darkmode,
    timestamp: user.timestamp,
  };
  const options = {
    expiresIn: '3d',
  };

  return jwt.sign(payload, jwtSecret, options);
};
