import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import ProjectForm from './ProjectForm';

export default function MutationWrappedUpdateForm({ refetch, selectedProject }) {
  console.log({ selectedProject });

  const UPDATE_PROJECT = gql`
      mutation updateProject($projectName: String!, $description: String!, $oldProjectName:String!) {
        updateProject(
          projectName: $projectName,
          description: $description,
          oldProjectName: $oldProjectName
        ){
          projectName,
          description
        }
      }
    `;

  return (
    <Mutation mutation={UPDATE_PROJECT}>
      {(updateProject, { data }) => (
        <ProjectForm version={2} refetch={refetch} selectedProject={selectedProject} callMutation={updateProject} />
      )}
    </Mutation>
  );
}
