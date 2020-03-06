const { graphqlUploadExpress } = require('graphql-upload');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const depthLimit = require('graphql-depth-limit');
const graphqlHTTP = require('express-graphql');
const { rainbow } = require('chalk-animation');
const bodyParser = require('body-parser');
const { promisify } = require('util');
const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');

// Initialize environment
require('dotenv').config();
const { authorization } = require('./utils');
const resolvers = require('./graphql');
const checkdir = promisify(fs.exists);
const mkdir = promisify(fs.mkdir);
const app = express();

// Connect the mangos
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});

app.use(bodyParser.json());

// Load required stuff for server like schema
Promise.all([
    importSchema('src/graphql/schema.graphql'),
    new Promise(async resolve => {
        const exist = await checkdir(process.env.STATIC);
        if (!exist) {
            await mkdir(process.env.STATIC);
        }
        resolve();
    }),
]).then(([typeDefs]) => {
    // Start GraphQL server
    app.use(
        '/graphql',
        authorization, // Check jwt
        graphqlUploadExpress(), // Sets up file uploading for GraphQL

        // Actual GraphQL stuff
        graphqlHTTP(({ user }) => ({
            validationRules: [depthLimit(5)],
            schema: makeExecutableSchema({
                resolvers,
                typeDefs,
            }),
            context: { user },
            graphiql: true,
        })),
    );

    // If we reach this, we gucci
    app.listen(process.env.PORT, () => {
        if (process.env.NODE_ENV === 'production') {
            console.log(
                `Sewvew stawted on http://localhost:${process.env.PORT} owo`,
            );
        } else {
            rainbow(
                `Sewvew stawted on http://localhost:${process.env.PORT} owo\n`,
                0.2,
            ).render();
        }
    });
});
