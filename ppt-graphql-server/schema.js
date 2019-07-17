const { gql } = require("apollo-server");

export default gql`

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
    addProject(projectName: String!, description: String!): Project
    updateProject(
      projectName: String!
      description: String!
      oldProjectName: String!
    ): Project
    deleteProject(projectName: String!): String
    addTime(projectName: String!, description: String!, duration: Int!): Time
    deleteTime(projectName: String!, description: String!): Time
  }
`;
