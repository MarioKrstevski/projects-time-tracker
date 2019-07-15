import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Project from './Project';
import { ProjectListContainer } from './styled-components';
import ProjectForm from './ProjectForm';

const GET_MY_PROJECTS = gql`
  {
    getProjects {
      projectName
      description
      time {
        description
        duration
      }
    }
  }
`;

function ProjectList({ projects }) {
  const projectList = projects.map(project => {
    return (
      <Project
        key={project.projectName}
        time={project.time}
        name={project.projectName}
        description={project.description}
      />
    );
  });

  return <div> {projectList} </div>;
}

export default function MainPage(props) {
  return (
    <Query query={GET_MY_PROJECTS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <ProjectListContainer>
            <ProjectForm addNewProject={props.addNewProject} />
            <ProjectList projects={data.getProjects} />
          </ProjectListContainer>
        );
      }}
    </Query>
  );
}
