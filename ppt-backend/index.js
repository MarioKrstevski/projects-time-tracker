import express from "express";
import bodyParser from "body-parser";
import ApolloClient from 'apollo-boost';
// the Apollo cache is set up automatically
import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "./schema";
import resolvers from "./resolvers";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const client = new ApolloClient();


const app = express();
app.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({ schema })
  );
  
  app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.listen(4444);
