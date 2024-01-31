const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const db = require('./config/mongodb');
var router = express.Router();

require('dotenv').config();

const app = express();
db();
app.use(bodyParser.json());

// const swaggerOptions = {
//     swaggerDefinition: (swaggerJsDoc.Options = {
//       info: {
//         title: 'Project API',
//         version: '1.0.0',
//         description: 'API documents',
//       },
//       servers: ['http://localhost:3000'],
//     }),
//     apis: ['index.js', './routes/*.js'],
// };
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const swaggerDocument = require('./docs/swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userRouter = require('./routes/users.route')(router);

app.use('/users', userRouter);

const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
