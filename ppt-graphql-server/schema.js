// import {gql} from 'apollo-server-express';
// const { ApolloServer} = require("apollo-server");

const { gql } = require("apollo-server");

export default gql`

  # new Date().toDateString()
  # "Sat Jul 06 2019"

  type Project {
    projectName: String
    description: String
    time: [Time]
  }

  type Time {
    description: String
    duration: Int
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    getProjects: [Project]
    getProject(projectName: String!): Project

  }

  type Mutation {
    addProject(projectName: String!, description: String!, time: Int): Project
    updateProject(projectName: String!, description: String!, time: Int): Project
    deleteProject(projectName: String!): Project
    addTime(projectName: String!, description: String!, duration: Int!): Time
    deleteTime(projectName: String!, description: String!): Time
  }
`;
