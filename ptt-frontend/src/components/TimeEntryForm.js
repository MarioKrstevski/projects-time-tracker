import React, { useRef } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { TimeEntryFormContainer } from './styled-components';

function TimeEntryForm({ name, refetch }) {
  const ADD_TIME = gql`
    mutation addTime($projectName: String!, $description: String!, $duration: Int!) {
      addTime(projectName: $projectName, description: $description, duration: $duration) {
        description
        duration
      }
    }
  `;
  const textInputDuration = useRef(null);
  const textInputDescription = useRef(null);

  return (
    <TimeEntryFormContainer>
      <div>
        <label htmlFor="taskDescription"> Task Description: </label>
        <input type="taskDescription" ref={textInputDescription} />
      </div>
      <div>
        <label htmlFor="taskDuration"> Task Duration: </label>
        <input name="taskDuration" type="number" ref={textInputDuration} />
      </div>
      <Mutation mutation={ADD_TIME}>
        {(addTime, { data }) => {
          return (
            <div className="addTimeButton">
              <button
                onClick={() => {
                  // console.log('Duration:', textInputDuration.current.value);
                  // console.log('Description:', textInputDescription.current.value);
                  // console.log('Variables: ', {
                  //   variables: {
                  //     projectName: name,
                  //     duration: textInputDuration.current.value,
                  //     duration2: parseInt(textInputDuration.current.value),
                  //     description: textInputDescription.current.value,
                  //   },
                  // });
                  addTime({
                    variables: {
                      projectName: name,
                      duration: parseInt(textInputDuration.current.value),
                      description: textInputDescription.current.value,
                    },
                  })
                    .then(({ data }) => {
                      // console.log('This data is from TimeEntry addTime mutation', data);
                      refetch();
                    })
                    .catch(err => {
                      console.log('Error from time Entry mutation addTime: ', err);
                    });
                  textInputDuration.current.value = 0;
                  textInputDescription.current.value = '';
                }}
              >
               <span>+</span> Add time
              </button>
            </div>
          );
        }}
      </Mutation>
    </TimeEntryFormContainer>
  );
}

export default TimeEntryForm;
