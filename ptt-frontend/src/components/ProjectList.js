import React, { useState } from 'react';
import ProjectForm from './ProjectForm';
import Project from './Project';
import { ProjectListContainer } from './styled-components';
import { Link } from '@reach/router';

export default function ProjectList(props) {
  const projectList = props.projects.map(project => {
    return (
      <div key={project.projectName}>
        <Link to={'project/' + project.projectName.toLowerCase()}>
          Open Project
        </Link>
        <Project
          addTime={props.addTime}
          key={project.projectName}
          time={project.time}
          name={project.projectName}
          description={project.description}
        />
      </div>
    );
  });

  return (
    <ProjectListContainer>
      <ProjectForm addNewProject={props.addNewProject} />
      {projectList}
    </ProjectListContainer>
  );
};