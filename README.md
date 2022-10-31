# Deprecated Contrax.finance Backend (V1)

Replaced by [contrax-backend](https://github.com/Contrax-co/contrax-backend)

# Technologies

#### Production

- Express: flexible, minimalist web framework for Node.js
- Meta-Auth: Express middleware for handling authentication w/ MetaMask
- Postgres: powerful, open source object-relational database system
- Knex: JS query builder compatible w/ various relational databases
- Helmet: Node module that helps in securing HTTP headers
- Cors: package for providing middleware to enable CORS
- Dotenv: module for loading environmental variables

#### Development

- Nodemon: simple monitor script for Node.js development
- Pg: non-blocking PostgresSQL client for Node.js
- Sqlite3: self-contained relational database management system
- Supertest: library for testing Node.js HTTP servers
- Mocha: testing framework w/ browser support and asynchronous testing
- Chai: BDD/TDD assertion library for Node.js and the browser

# Table of Contents

- [Auth Routes](#AuthRoutes)

  - GET: retrieve address and issue challenge via meta-auth
  - GET: verify message signature and check 'recovered' property
  - GET: logout / disconnect wallet

- [Favorites Routes](#FavoritesRoutes)

  - GET: retrieve all Favorites
  - GET: retrieve a specific Favorite by ID
  - GET: retrieve all Favorites for a specific user address
  - POST: add a new Favorite
  - PUT: update a specific Favorite by ID
  - DELETE: remove a specific Favorite by ID

# Auth Routes

## GET MetaAddress

#### _Method Url:_ `/api/auth`

##### HTTP method: [GET]

### **Retrieve Ethereum address and issue challenge**

```
// TO DO: ADD SAMPLE CODE SNIPPET
```

## GET MetaMessage and MetaSignature

#### _Method Url:_ `/api/auth`

##### HTTP method: [GET]

### **Verify message signature and check 'recovered' property**

```
// TO DO: ADD SAMPLE CODE SNIPPET
```

## GET Logout

#### _Method Url:_ `/api/auth`

##### HTTP method: [GET]

### **Disconnect wallet from database by nullifying JWT**

```
// TO DO: ADD SAMPLE CODE SNIPPET
```

# Favorites Routes

## GET All Favorites

#### _Method Url:_ `/api/favorites`

##### HTTP method: [GET]

### **Get a list of all Favorites**

### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and an array of objects containing all Favorites in the database.

```
// TO DO: ADD SAMPLE CODE SNIPPET
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and an object containing the following error message.

```
{
    error: "Server failed to retrieve Favorites"
}
```

## Get Favorite By ID

#### _Method Url:_ `/api/favorites/:id`

##### HTTP method: [GET]

### **Get a specific Favorite by ID**

### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and an array containing a single Favorite object.

```
// TO DO: ADD SAMPLE CODE SNIPPET
```

404(CLIENT ERROR)

The endpoint will return a HTTP response with a status code 400 and an object containing the following error message.

```
{
    "error": "No match found for the ID provided"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and an object containing the following error message.

```
{
    error: "Server failed to retrieve Favorite"
}
```

## Get Favorites By userAddress

#### _Method Url:_ `/api/favorites/:userAddress`

##### HTTP method: [GET]

### **Get all Favorites for a specific user address**

### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and an array containing the Favorites objects.

```
// TO DO: ADD SAMPLE CODE SNIPPET
```

404(CLIENT ERROR)

The endpoint will return a HTTP response with a status code 400 and an object containing the following error message.

```
{
    "error": "No match found for the address provided"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and an object containing the following error message.

```
{
    error: "Server failed to retrieve data for the address provided"
}
```

# Post a New Favorite

#### _Method Url:_ `/api/favorites`

##### HTTP method: [POST]

### **POST a new favorite to the database**

### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

### Body

| Name          |  Type  | Required |                 Description                 |
| :------------ | :----: | :------: | :-----------------------------------------: |
| `userAddress` | String |   Yes    |      Associated user's public address       |
| `favAddress`  | String |   Yes    | Public address being saved and/or nicknamed |
| `favAlias`    | String |   Yes    |  Alias for the public address being stored  |

### Request

```
// TO DO: ADD SAMPLE CODE SNIPPET
```

### Response

201 (Created)

The endpoint will return a HTTP response with status code 200 and an array containing the newly created Favorite object.

```
// TO DO: ADD SAMPLE CODE SNIPPET
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and an object containing the following error message.

```
{
    error: "Server failed to add Favorite. Check for missing required field(s)"
}
```

# Update Favorite by ID

#### _Method Url:_ `/api/favorites/:id`

##### HTTP method: [PUT]

### **Update a specific Favorite by ID**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and an object containing a success message and count of the number of Favorites updated.

```
{
    message: "Favorite successfully updated",
    count: 1
}
```

404(CLIENT ERROR)

The endpoint will return a HTTP response with a status code 400 and an object containing the following error message.

```
{
    "error": "No match found for the ID provided"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and an object containing the following error message.

```
{
    error: "Server failed to update Favorite"
}
```

# Delete Favorite by ID

#### _Method Url:_ `/api/favorites/:id`

##### HTTP method: [DELETE]

### **Delete a specific Favorite by ID**

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
    message: "Favorite successfully deleted"
}
```

404(CLIENT ERROR)

The endpoint will return a HTTP response with a status code 400 and an object containing the following error message.

```
{
    "error": "No match found for the ID provided"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and an object containing the following error message.

```
{
    error: "Server failed to delete Favorite"
}
```
