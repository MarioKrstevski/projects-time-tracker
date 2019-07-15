import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Project from './Project';
import Modal from './Modal';
import { ProjectListContainer } from './styled-components';
import MutationWrappedProjectForm from './MutationWrappedProjectForm';

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

function ProjectList({ projects, refetch }) {
  const projectList = projects.map(project => {
    return (
      <Project
        refetch={refetch}
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
      {({ loading, error, data, refetch }) => {

        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <ProjectListContainer>
            <MutationWrappedProjectForm refetch={refetch} addNewProject={props.addNewProject} />
            <ProjectList refetch={refetch} projects={data.getProjects} />
            <Modal refetch={refetch}>
              {()=>{

              }}
            </Modal>
          </ProjectListContainer>
        );
      }}
    </Query>
  );
}
