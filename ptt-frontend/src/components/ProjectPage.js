import React, { useRef } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_PROJECT_DETAILS = gql`
  {
    getProject(pN: $projectName) {
      projectName
      description
    }
  }
`;

export default function ProjectPage(props) {
  const textInputValue = useRef(null);

  const projectName = capitalizeFirstLetter(props.projectName);

  const addTimeToProject = () => {
    textInputValue.current.focus();
    if (textInputValue.current.value !== '') {
      props.addTime(projectName, {
        dateRegistered: new Date(),
        duration: parseInt(textInputValue.current.value),
      });
      textInputValue.current.value = '';
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const theProject = props.projects.find(proj => {
    return projectName === proj.projectName;
  });

  const timeEntriesList = theProject.time.map((timeEntry, index) => {
    let { dateRegistered, duration } = timeEntry;

    return <div key={index} children={` Date: ${dateRegistered}, Time: ${duration} `} />;
  });


  return (
    <Query query={GET_PROJECT_DETAILS} variables={{ projectName: props.projectName}}>
      {({ loading, error, data }) => {

        console.log({detailsData:data})
        console.log({projectName:props.projectName})
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <div>
            <h1>{theProject.name}</h1>
            <p>{theProject.description}</p>
            <p> Total Hours: {theProject.time.reduce((acc, current) => acc + current.duration, 0) / 3600}</p>
            {timeEntriesList}

            <div>
              <input type="number" ref={textInputValue} />
              <button onClick={addTimeToProject}>Add time</button>
            </div>
          </div>
        );
      }}
    </Query>
  );
}
