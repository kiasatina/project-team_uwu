const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app });
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${ process.env.PORT }`);
});