exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          id: '0xDDDDDDDDDDOOOOOOOOOONNNNNNNNNNTTTTTTTTTT',
          name: 'User 1',
          email: 'user1@someemail.com',
          image: 'https://www.gstatic.com/webp/gallery/1.jpg',
          darkmode: false,
        },
        {
          id: '0x2DDDDDDDDDOOOOOOOOOONNNNNNNNNNTTTTTTTTT2',
          name: 'User 2',
          email: 'user2@someemail.com',
          image: 'https://www.gstatic.com/webp/gallery/2.jpg',
          darkmode: true,
        },
        {
          id: '0x3DDDDDDDDDOOOOOOOOOONNNNNNNNNNTTTTTTTTT3',
          name: 'User 3',
          email: 'user3@someemail.com',
          image: 'https://www.gstatic.com/webp/gallery/3.jpg',
          darkmode: true,
        },
        {
          id: '0x4DDDDDDDDDOOOOOOOOOONNNNNNNNNNTTTTTTTTT4',
          name: 'User 4',
          email: 'user4@someemail.com',
          image: 'https://www.gstatic.com/webp/gallery/4.jpg',
          darkmode: false,
        },
        {
          id: '0x5DDDDDDDDDOOOOOOOOOONNNNNNNNNNTTTTTTTTT5',
          name: 'User 5',
          email: 'user5@someemail.com',
          image: 'https://www.gstatic.com/webp/gallery/5.jpg',
          darkmode: false,
        },
        {
          id: '0x6DDDDDDDDDOOOOOOOOOONNNNNNNNNNTTTTTTTTT6',
          name: 'User 6',
          email: 'user6@someemail.com',
          image: 'https://www.gstatic.com/webp/gallery/6.jpg',
          darkmode: true,
        },
      ]);
    });
};
