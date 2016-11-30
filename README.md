# Ridgegram backend
[Ridgegram frontend](https://github.com/skoob13/ridgegram_frontend)
## Installation
`npm install` (or `yarn`)

`gulp serve`
## Based on
* `Node.js`
* `Express`
* `MongoDB (mongoose)`
* `JWT`

## Endpoints

|Route|Protected|Description|
|---|---|---|
|POST: api/signin|false|Sign in to account|
|POST: api/signup|false|Sign up to account|
|GET: api/image/:id|false|Shows user's avatar|
|GET: api/user/:id|true|Returns info about user|
|GET: api/users|true|Returns user list by opposite gender. Specifies with offset|
|POST: api/user/like|true|Increments likes count|
