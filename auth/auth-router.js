const router = require('express').Router();
const generateToken = require('./generate-token');
const Users = require('./auth-model');
const MetaAuth = require('meta-auth');

const metaAuth = new MetaAuth({
  banner: 'Contrax.co',
});

router.get('/:MetaAddress', metaAuth, (req, res) => {
  // request a message from the server
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge);
  }
});

router.get('/:MetaMessage/:MetaSignature', metaAuth, (req, res) => {
  if (req.metaAuth && req.metaAuth.recovered) {
    // signature matches the cache address/challenge
    // authentication is valid, assign JWT, etc.
    res.send(req.metaAuth.recovered);

    // TO DO: DEBUG THIS SECTION
    Users.findByWallet(req.metaAuth.MetaAddress)
      .then((user) => {
        // if user already exists in db, assign JWT
        if (user[0]) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Server authentication successful!`,
            wallet: user.publicAddress,
            username: user.username,
            token,
          });
        } else {
          Users.add({ publicAddress: req.metaAuth.MetaAddress })
            .then((newUser) => {
              const token = generateToken(newUser);
              res.status(201).json({
                message: `User added. Server authentication successful!`,
                wallet: newUser.publicAddress,
                username: newUser.username,
                token,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error:
                  'Server failed to add user. Please check for missing Required field(s)',
              });
            });
          res.status(401).json({
            error:
              'Authentication failed to find or add user by wallet address.',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: 'Invalid authentication. Please try again.',
        });
      });
  } else {
    res
      .status(500)
      .send()
      .json({ error: 'Invalid authentication. Signature does not match.' });
  }
});

router.get('/logout', (req, res) => {
  res
    .status(200)
    .send({ token: null })
    .json({ message: 'Successfully logged out' });
});
