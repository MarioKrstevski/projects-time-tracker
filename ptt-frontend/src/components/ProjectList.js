import React, { useState } from 'react';
import ProjectForm from './ProjectForm';
import Project from './Project';
import { ProjectListContainer } from './styled-components';

export default function ProjectList() {
  const [projects, setProjects] = useState([
      {projectName:'Google',description:'a search engine'},
      {projectName:'Youtube',description:'video sharing platform'},
      {projectName:'Flutter',description:'Better Android'},
    ]);
  const addProject = newProject => {
    setProjects([...projects, newProject]);
  };

  const projectList = projects.map(project => (
    <Project key={project.projectName} name={project.projectName} description={project.description} />
  ))

  return (
    <ProjectListContainer>
      <ProjectForm addProject={addProject} />
      {projectList}
    </ProjectListContainer>
  );
}
