# Contrax.co Backend API

[--->Deployment URL Coming Soon<---](https://contrax.herokuapp.com/)

# Technologies

#### Production

- Express: a flexible, minimalist web framework for Node.js
- Bcrypt: a password-hashing function used to secure user data
- Postgres: a powerful, open source object-relational database system
- Knex: a JS query builder compatible w/ various relational databases
- Helmet: a Node.js module that helps in securing HTTP headers
- Cors: a package for providing middleware to enable CORS
- Dotenv: a module for loading environmental variables

#### Development

- Nodemon: a simple monitor script for Node.js development
- Pg: a non-blocking PostgresSQL client for Node.js
- Sqlite3: a self-contained relational database management system
- Supertest: a library for testing Node.js HTTP servers
- Mocha: a testing framework w/ browser support and asynchronous testing
- Chai: a BDD/TDD assertion library for Node.js and the browser

# Table of Contents

- [Users Routes](#UsersRoutes)

  - GET: retrieve all Users
  - GET: retrieve a specific User by ID
  - POST: add a new User
  - PUT: update a specific User by ID
  - DELETE: remove a specific User by ID

# Users Routes

### /api/

## GET All Users

#### _Method Url:_ `/api/users`

##### HTTP method: [GET]

### **Get a list of all Users**

### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and an array of objects containing all Users in the database.

```
[
    {
        "id": "0x9zV6yt5KXiXN5o5nk3e3eDxuuX30PS8EUT4ZOXfu",
        "name": "Bob",
        "email": "bob@furniturestore.io",
        "image": "https://fakeimg.pl/300/",
        "darkmode": true,
        "last_updated": "2021-06-29T01:14:44.000Z"
    },
    {
        "id": "0xr863zDkQqPx1l8gfNHPTwCI97KObLoaERZotx9ez",
        "name": "Sally",
        "email": "sally@mayloans.com",
        "image": "https://fakeimg.pl/250x100/",
        "darkmode": false,
        "last_updated": "2021-07-01T22:53:23.000Z"
    },
    {
        "id": "0xsbF2Su960gK6qH5zKwkGhw8kOTrWhcXyDi5vwqos",
        "name": "Ruth",
        "email": "ruth@lessness.co",
        "image": "https://fakeimg.pl/350x200/?text=Hello_World",
        "darkmode": true,
        "last_updated": "2021-07-04T09:26:38.000Z"
    }
]
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and an object containing the following error message.

```
{
    error: "Server failed to retrieve users"
}
```

## Get User By ID

#### _Method Url:_ `/api/users/:id`

##### HTTP method: [GET]

### **Get a specific User by ID (wallet address)**

### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and an array containing a single User object.

```
[
    {
        "id": "0x9zV6yt5KXiXN5o5nk3e3eDxuuX30PS8EUT4ZOXfu",
        "name": "Bob",
        "email": "bob@furniturestore.io",
        "image": "https://fakeimg.pl/300/",
        "darkmode": true,
        "last_updated": "2021-06-29T01:14:44.000Z"
    }
]
```

404(CLIENT ERROR)

The endpoint will return a HTTP response with a status code 400 and an object containing the following error message.

```
{
    "error": "A user with that ID does not exist"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and an object containing the following error message.

```
{
    error: "Server failed to retrieve User"
}
```

# Post a New User

#### _Method Url:_ `/api/users`

##### HTTP method: [POST]

### **POST a new user to the database**

### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

### Body

| Name       |  Type   | Required |                  Description                   |
| :--------- | :-----: | :------: | :--------------------------------------------: |
| `id`       | String  |   Yes    |   User's wallet address to identify account    |
| `name`     | String  |    No    |       User's nickname or preferred title       |
| `email`    | String  |    No    |              User's email address              |
| `image`    | String  |    No    |             URL for User's avatar              |
| `darkmode` | Boolean |    No    | User's darkmode preference - defaults to False |

### Request

```
{
    "id": "0xsbF2Su960gK6qH5zKwkGhw8kOTrWhcXyD87isoAx",
    "name": "Jake",
    "email": "jake@statepharm.fi",
    "image": "https://fakeimg.pl/250x100/ff0000/"
}
```

### Response

201 (Created)

The endpoint will return a HTTP response with status code 200 and an array containing the newly created User object.

```
[
    {
        "id": "0xsbF2Su960gK6qH5zKwkGhw8kOTrWhcXyD87isoAx",
        "name": "Jake",
        "email": "jake@statepharm.fi",
        "image": "https://fakeimg.pl/250x100/ff0000/",
        "darkmode": false,
        "last_updated": "2021-07-13T12:02:19.000Z"
    }
]
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and an object containing the following error message.

```
{
    error: "Server could not add user. Check for missing non-nullible field(s)."
}
```

# Update User by ID

#### _Method Url:_ `/api/users/:id`

##### HTTP method: [PUT]

### **Update a specific User by ID**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and an object containing a success message and count of the number of Users updated.

```
{
    message: "User successfully updated",
    count: 1
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and an object containing the following error message.

```
{
    error: "Server failed to update user"
}
```

# Delete User by ID

#### _Method Url:_ `/api/users/:id`

##### HTTP method: [DELETE]

### **Delete a specific user by ID**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and an object containing the following message.

```
{
    message: "User deleted successfully"
}
```

404(CLIENT ERROR)

The endpoint will return a HTTP response with a status code 400 and an object containing the following error message.

```
{
    "error": "A user with that ID does not exist"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and an object containing the following error message.

```
{
    error: "Server failed to delete user"
}
```
