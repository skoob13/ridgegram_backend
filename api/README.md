# Ridgegram backend
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
|GET: api/user/:id|true|Returns info about user|
|GET: api/users|true|Return user list by opposite gender. Specifies with offset|
|POST: api/user/like|true|Increment likes count|
