import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import TimeEntryForm from './TimeEntryForm';

const GET_PROJECT_DETAILS = gql`
  query GET_PROJECT_DETAILS($projectName: String!) {
    getProject(projectName: $projectName) {
      projectName
      description
      time {
        duration
        description
      }
    }
  }
`;
const DELETE_TIME = gql`
  mutation deleteTime($projectName: String!, $description: String!) {
    deleteTime(projectName: $projectName, description: $description) {
      description
      duration
    }
  }
`;



function TimeEntry({ description, duration, name, refetch }) {
  return (
    <div>
      <p>{description}</p>
      <p>{duration}</p>
      <Mutation mutation={DELETE_TIME}>
        {(deleteTime, { data }) => {
          console.log('This is the data from deleteTime : ', data);

          return (
            <button
              onClick={() => {
                deleteTime({ variables: { projectName: name, description } })
                  .then(({ data }) => {
                    console.log('This data is from TimeEntry deleteTime mutation', data);
                    refetch();
                  })
                  .catch(err => {
                    console.log('Error from time Entry mutation delteTime: ', err);
                  });
              }}
            >
              Remove
            </button>
          );
        }}
      </Mutation>
    </div>
  );
}
export default function ProjectPage(props) {
  

  return (
    <Query query={GET_PROJECT_DETAILS} variables={{ projectName: window.location.href.split('/').pop() }}>
      {({ loading, error, data, refetch }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const { projectName: name, description, time } = data.getProject;
        const timeEntriesList = time.map(timeEntry => {
          return (
            <TimeEntry
              refetch={refetch}
              name={name}
              key={timeEntry.description}
              description={timeEntry.description}
              duration={timeEntry.duration}
            />
          );
        });
        return (
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <p> Total Hours: {time.reduce((acc, current) => acc + current.duration, 0) / 3600}</p>
            {timeEntriesList}
            <TimeEntryForm name={name} refetch={refetch} />
          </div>
        );
      }}
    </Query>
  );
}
