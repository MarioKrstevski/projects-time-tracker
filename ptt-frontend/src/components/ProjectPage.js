import React, { useRef } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

function TimeEntry({ description, duration }) {
  return (
    <div>
      <p>{description}</p>
      <p>{duration}</p>
      <button> Remove </button>
    </div>
  );
}
export default function ProjectPage(props) {
  const textInputValue = useRef(null);

  return (
    <Query query={GET_PROJECT_DETAILS} variables={{ projectName: window.location.href.split('/').pop() }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const { projectName: name, description, time } = data.getProject;
        const timeEntriesList = time.map(timeEntry => {
          return (
            <TimeEntry key={timeEntry.description} description={timeEntry.description} duration={timeEntry.duration} />
          );
        });
        return (
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <p> Total Hours: {time.reduce((acc, current) => acc + current.duration, 0) / 3600}</p>
            {timeEntriesList}

            <div>
              <input type="number" ref={textInputValue} />
              <button>Add time</button>
            </div>
          </div>
        );
      }}
    </Query>
  );
}
