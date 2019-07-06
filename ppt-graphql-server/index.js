const { ApolloServer, gql } = require("apollo-server");

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const projects = [
  {
    projectName: "Google",
    description: "a search engine",
    time: [
      { dateRegistered: new Date(), duration: 2000 },
      { dateRegistered: new Date(), duration: 8000 }
    ]
  },
  {
    projectName: "Youtube",
    description: "video sharing platform",
    time: [
      { dateRegistered: new Date(), duration: 1000 },
      { dateRegistered: new Date(), duration: 3000 }
    ]
  },
  {
    projectName: "Flutter",
    description: "Better Android",
    time: [
      { dateRegistered: new Date(), duration: 3300 },
      { dateRegistered: new Date(), duration: 4000 }
    ]
  }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  
  # new Date().toDateString()
  # "Sat Jul 06 2019"

  type Project {
    projectName: String
    description: String
    time: Time
  }

  type Time {
    dateRegistered: String!
    duration: Int!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    getProjects: [Project]
    getProject: Project
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    getProjects: () => projects
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
