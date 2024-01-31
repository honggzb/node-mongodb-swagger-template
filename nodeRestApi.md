## Setup

1. `npm init -y`
2. `npm i express mongoose dotenv`
3. `npm i --save-dev nodemon`

## File structure

- services <-- Controllers <-- routes

```
📂 nodeRestApi
 ┣ 📂 Config
 ┃   ┣ 📂 models
 ┃   ┃  ┣ 📄 posts.model.js
 ┃   ┃  ┗ 📄 users.model.js
 ┃   ┗ 📄 mongodb.js
 ┣ 📂 controllers
 ┃   ┣ 📄 posts.controller.js
 ┃   ┗ 📄 users.controller.js
 ┣ 📂 routes
 ┃   ┣ 📄 posts.route.js
 ┃   ┗ 📄 users.route.js
 ┣ 📂 services
 ┃   ┣ 📄 posts.service.js
 ┃   ┗ 📄 users.service.js
 ┗ 📄 index.js
```

[⬆ back to top](#top)

## Swagger setup

- `npm i swagger-jsdoc swagger-ui-express body-parser`
  - `swaggerOptions` contains the API definition and a reference to the API routes, which are stored in the routes directory
  - `swaggerJsDoc` package generates the swagger.json file based on these annotations
  - `swagger-ui-express` package is used to create a Swagger UI

```ts
const express = require('express')
const bodyParser = require("body-parser")
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A sample API for learning Swagger',
    },
    servers: [ { url: 'http://localhost:3000' }],
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Your API routes go here
```

[⬆ back to top](#top)

### AutoGen Document

1. `npm install --save-dev swagger-autogen`: [swagger-autogen](https://swagger-autogen.github.io/docs/)
2. Create 'docs' folder in root directory
3. create a `swagger.js` file inside the 'docs' folder
4. modify package.json, add `"start-gendoc": "node ./docs/swagger.js"`
5. execute `npm run start-gendoc`  -> will generate the `swagger.json` file 
6. execute `npm run start` and input `http://localhost:3000/api-docs/` in browser

```ts
// swagger.js
const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'API documents',
    description: 'API Swagger documents'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/users.route.js'];

swaggerAutogen(outputFile, routes, doc);
```

- [Simple Example](https://github.com/davibaltar/example-swagger-autogen)
- [Advanced Example](https://github.com/davibaltar/example-swagger-autogen-with-router)
- [How To Add Swagger To NodeJS REST API](https://rajputankit22.medium.com/how-to-add-swagger-to-nodejs-rest-api-7caa870741be)

[⬆ back to top](#top)

-------------------------------------------------------------

> References
- [HTTP Status Codes With Explanations](https://devqa.io/http-status-codes/)
- [Documenting Node.js REST API using Swagger](https://www.linkedin.com/pulse/documenting-nodejs-rest-api-using-swagger-avyavesh-technologies/)
- [OpenAPI (Swagger) module for Nest](https://github.com/nestjs/swagger?tab=readme-ov-file)
- [How To Add Swagger To NodeJS REST API](https://rajputankit22.medium.com/how-to-add-swagger-to-nodejs-rest-api-7caa870741be)
- [Build a REST API with Node.js, Express, and MySQL](https://blog.logrocket.com/build-rest-api-node-express-mysql/)