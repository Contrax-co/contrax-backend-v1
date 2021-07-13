const server = require('./server.js');
const request = require('supertest');
const expect = require('chai').expect;

// GET: retrieve a list of all Users ( /api/users )
describe('GET /api/users', function () {
  it('should return json 200 and an array of objects', (done) => {
    request(server)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

// GET: retrieve a specific User by ID ( /api/users/:id )
describe('GET /api/users/:id', function () {
  // With an existing User ID
  it('should respond with json 200 and an array containing one user', (done) => {
    request(server)
      .get('/api/users/0x3DDDDDDDDDOOOOOOOOOONNNNNNNNNNTTTTTTTTT3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
        done();
      });
  });
  // With a non-existent User ID
  it('should respond with json 404 and an object with valid error message', (done) => {
    request(server)
      .get('/api/users/0xSomeMadeUpWalletAddress')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('A user with that ID does not exist');
        done();
      });
  });
});

// POST: add a new User ( /api/users )
describe('POST /api/users', function () {
  // With all required fields provided
  it('should respond with json 201 and an array containing the new user', (done) => {
    request(server)
      .post('/api/users')
      .send({
        id: '0x4DDDDDDDDDOOOOOOOOOONNNNNNNNNNTTTTTTTTT4',
        name: 'User 4',
        email: 'user4@someemail.com',
        image: 'https://www.gstatic.com/webp/gallery/4.jpg',
        darkmode: false,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
        done();
      });
  });
  // Without all required fields provided
  it('should respond with json 400 and an object with valid error message', (done) => {
    request(server)
      .post('/api/users')
      .send({
        name: 'User 4', // no ID field included in POST
        email: 'user4@someemail.com',
        image: 'https://www.gstatic.com/webp/gallery/4.jpg',
        darkmode: false,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal(
          'Server could not add user. Check for missing non-nullible field(s).'
        );
        done();
      });
  });
});

// PUT: update an existing User by ID ( /api/users/:id )
describe('PUT /api/users/:id', function () {
  // with an existing User ID
  it('should respond with json 200 and and an object with valid body', (done) => {
    request(server)
      .put('/api/users/0x5DDDDDDDDDOOOOOOOOOONNNNNNNNNNTTTTTTTTT5')
      .send({ darkmode: true }) // User changed settings to prefer darkmode
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('User updated successfully');
        expect(res.body.count).to.equal(1);
        done();
      });
  });
  // with an existing User ID but updating non-existent data fields
  it('should respond with json 500 and an object with valid error message', (done) => {
    request(server)
      .put('/api/users/0x6DDDDDDDDDOOOOOOOOOONNNNNNNNNNTTTTTTTTT6')
      .send({ nonexistent: 'Hello World' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Server failed to update user');
        done();
      });
  });
  // with a non-existent User ID
  it('should respond with json 404 and an object with valid error message', (done) => {
    request(server)
      .put('/api/users/0xSomeMadeUpWalletAddress')
      .send({ darkmode: true })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('A user with that ID does not exist');
        done();
      });
  });
});

// DELETE: remove an existing User by ID ( /api/users/:id)
describe('DELETE /api/users:id', function () {
  // with an existing User ID
  it('should respond with json 200 and an object with valid success message', (done) => {
    request(server)
      // Change this ID before running tests a second time, or redeploy seeds first
      .delete('/api/users/0x2DDDDDDDDDOOOOOOOOOONNNNNNNNNNTTTTTTTTT2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('User deleted successfully');
        done();
      });
  });
  // with a non-existing User ID
  it('should respond with json 500 and an object with valid error message', (done) => {
    request(server)
      .delete('/api/users/0xSomeMadeUpWalletAddress')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('A user with that ID does not exist');
        done();
      });
  });
});
