import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from '@reach/router';
import Project from './Project';
import { ProjectListContainer } from './styled-components';
import ProjectForm from './ProjectForm';

// const GET_PROJECTS = gql`
//   {
//     project {
//       name
//       description
//       time {
//         date
//         duration
//       }
//     }
//   }
// `;

const GET_PROJECTS = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export default function ProjectFeed(props) {
  const projectList = props.projects.map(project => {
    return (
      <div key={project.projectName}>
        <Link to={'project/' + project.projectName.toLowerCase()}>Open Project</Link>
        <Project
          addTime={props.addTime}
          key={project.projectName}
          time={project.time}
          name={project.projectName}
          description={project.description}
        />
      </div>
    );
  });
  return (
    <Query query={GET_PROJECTS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <ProjectListContainer>
            <ProjectForm addNewProject={props.addNewProject} />
            {projectList}
          </ProjectListContainer>
        );
      }}
    </Query>
  );
}
