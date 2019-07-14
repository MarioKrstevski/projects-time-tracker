import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from '@reach/router';
import Project from './Project';
import { ProjectListContainer } from './styled-components';
import ProjectForm from './ProjectForm';


const GET_MY_PROJECTS = gql`
  {
    getProjects {
      projectName
      description
    }
  }
`;

export default function MainPage(props) {
  return (
    <Query query={GET_MY_PROJECTS}>
      {({ loading, error, data }) => {

       const  { projects } = data;
       console.log({ projects });

       let projectList = [];

        if (projects){

        projectList = projects.map(project => {
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
        }

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
