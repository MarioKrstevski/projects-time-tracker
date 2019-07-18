import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Project from './Project';
import Modal from './Modal';
import { ProjectListContainer, MainPageContainer } from './styled-components';
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

function ProjectList({ projects, refetch, setSelectedProject, modalInteraction }) {
  const projectList = projects.map(project => {
    return (
      <Project
        setSelectedProject={setSelectedProject}
        modalInteraction={modalInteraction}
        refetch={refetch}
        key={project.projectName}
        time={project.time}
        name={project.projectName}
        description={project.description}
      />
    );
  });

  return <ProjectListContainer> {projectList} </ProjectListContainer>;
}

export default function MainPage(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const modalInteraction = {
    openModal: () => setModalIsOpen(true),
    closeModal: () => setModalIsOpen(false),
    switchModalState: () => setModalIsOpen(!modalIsOpen),
  };
  return (
    <Query query={GET_MY_PROJECTS}>
      {({ loading, error, data, refetch }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <MainPageContainer>
            <MutationWrappedProjectForm refetch={refetch} addNewProject={props.addNewProject} />
            <ProjectList
              setSelectedProject={setSelectedProject}
              modalInteraction={modalInteraction}
              refetch={refetch}
              projects={data.getProjects}
            />
            <Modal refetch={refetch} setSelectedProject={setSelectedProject} selectedProject={selectedProject} isOpen={modalIsOpen} modalInteraction={modalInteraction}>
            </Modal>
          </MainPageContainer>
        );
      }}
    </Query>
  );
}
