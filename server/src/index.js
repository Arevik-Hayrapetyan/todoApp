import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello world!",
    },
};

const app = express();
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`));
