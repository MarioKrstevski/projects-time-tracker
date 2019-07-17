import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import TimeEntryForm from './TimeEntryForm';

import {
  ProjectPageContainer,
  ProjectStats,
  TimeEntryHeader,
  TimeEntryElement,
  ButtonContainer,
  TimeEntriesList,
} from './styled-components';

const GET_PROJECT = gql`
  query GET_PROJECT($projectName: String!) {
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
    <TimeEntryElement>
      <p>{description}</p>
      <p>{duration}</p>
      <Mutation mutation={DELETE_TIME}>
        {(deleteTime, { data }) => {
          return (
            <ButtonContainer>
              <button
                onClick={() => {
                  deleteTime({ variables: { projectName: name, description } })
                    .then(({ data }) => {
                      // console.log('This data is from TimeEntry deleteTime mutation', data);
                      refetch();
                    })
                    .catch(err => {
                      console.log('Error from time Entry mutation delteTime: ', err);
                    });
                }}
              >
                <span>X</span> Delete
              </button>
            </ButtonContainer>
          );
        }}
      </Mutation>
    </TimeEntryElement>
  );
}
export default function ProjectPage() {
  return (
    <ProjectPageContainer>
      <Query query={GET_PROJECT} variables={{ projectName: window.location.href.split('/').pop() }}>
        {({ loading, error, data, refetch }) => {
          console.log({ projectName: window.location.href.split('/').pop() });
          console.log('GetProject', { data });
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          if(data.getProject){

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
              <ProjectStats>
                <div>
                  <h1>{name}</h1>
                  <p>{description}</p>
                </div>
                <div className="totalTime">
                  <div> Total Hours Spent: </div>
                  <div className="time">{time.reduce((acc, current) => acc + current.duration, 0) / 3600}</div>
                </div>
              </ProjectStats>
              <TimeEntryHeader>
                <div> Task Name </div>
                <div> Time Spent</div>
                <div> Actions </div>
              </TimeEntryHeader>
              <TimeEntriesList>{timeEntriesList}</TimeEntriesList>
              <TimeEntryForm name={name} refetch={refetch} />
            </div>
          );
        }
        else {
          return "Item doesn't exist"
        }
        }}
      </Query>
    </ProjectPageContainer>
  );
}
