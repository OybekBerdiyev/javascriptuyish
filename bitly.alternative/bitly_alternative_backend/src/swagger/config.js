const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'This swagger is documentation for Urlshorter',
        version: '1.0.0',
        description:
            "This is a backend documentation for the frontend",
    },
    servers: [
        {
            url: 'http://localhost:4000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["src/swagger/*.swagger.js"],
};


const swaggerUi = require('swagger-ui-express');

const swaggerSpec = swaggerJSDoc(options);



module.exports = {
    swaggerUi,
    swaggerSpec
}