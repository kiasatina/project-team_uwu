const { graphqlUploadExpress } = require('graphql-upload');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const depthLimit = require('graphql-depth-limit');
const graphqlHTTP = require('express-graphql');
const { promisify } = require('util');
const fs = require('fs');

const { authorization } = require('./utils');
const resolvers = require('./graphql');
const checkdir = promisify(fs.exists);
const mkdir = promisify(fs.mkdir);

module.exports = async app => {
    // Load required stuff for server like schema
    const [typeDefs] = await Promise.all([
        importSchema('src/graphql/schema.graphql'),
        (async () => {
            const exist = await checkdir(process.env.STATIC);
            if (!exist) {
                await mkdir(process.env.STATIC);
            }
        })(),
    ]);

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
        })),
    );
};
