import React from 'react';
import { Link } from '@reach/router';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { ProjectContainer, Button, ButtonsContainer, TotalTime} from './styled-components';

export default function MutationWrappedProject(props) {
  const DELETE_PROJECT = gql`
    mutation addProject($projectName: String!) {
      deleteProject(projectName: $projectName)
    }
  `;

  return (
    <Mutation mutation={DELETE_PROJECT}>
      {(deleteProject, { data }) => <Project deleteProject={deleteProject} {...props} />}
    </Mutation>
  );
}

function Project({ name, description, time, deleteProject, refetch, modalInteraction, setSelectedProject }) {
  const handleDeleteProject = () => {
    deleteProject({ variables: { projectName: name } })
      .then(({ data }) => {
        console.log(' I am data from delting project', data);
        refetch();
      })
      .catch(err => {
        console.log('Error when deleting Project', err);
      });
  };

  const handleUpdateProject = () => {
    setSelectedProject({ projectName: name, description });
    modalInteraction.openModal();
  };

  return (
    <ProjectContainer>
      <h2>{name}</h2>
      <p>{description}</p>
      <TotalTime> Total Hours: <span>{time && time.reduce((acc, current) => acc + current.duration, 0) / 3600} </span></TotalTime>

      <ButtonsContainer>
        <Link to={'project/' + name.toLowerCase()}>
          <Button action>
            Open
          </Button>
        </Link>

        <Button danger onClick={handleDeleteProject}>
          Delete
        </Button>
        <Button change onClick={handleUpdateProject}>
          Update
        </Button>
      </ButtonsContainer>
    </ProjectContainer>
  );
}
