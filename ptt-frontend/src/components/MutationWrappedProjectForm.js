import ProjectForm from './ProjectForm';
import React from 'react'

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export default function MutationWrappedProjectForm({refetch}) {
    const ADD_PROJECT = gql`
      mutation addProject($projectName: String!, $description: String!) {
        addProject(projectName: $projectName, description: $description) {
          description
          projectName
        }
      }
    `;
  
    return (
      <Mutation mutation={ADD_PROJECT}>{(addProject, { data }) => <ProjectForm version={1} refetch={refetch} callMutation={addProject} />}</Mutation>
    );
  }