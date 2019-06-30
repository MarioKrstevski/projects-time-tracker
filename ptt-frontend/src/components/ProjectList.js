import React, { useState } from 'react';
import ProjectForm from './ProjectForm';
import Project from './Project';
import { ProjectListContainer } from './styled-components';
import { Link } from "@reach/router"

export default function ProjectList() {
  const [projects, setProjects] = useState([
      {projectName:'Google',description:'a search engine',time:[
          {dateRegistered:new Date(), duration:2000},{dateRegistered:new Date(), duration:8000}]},
      {projectName:'Youtube',description:'video sharing platform',time:[
          {dateRegistered:new Date(), duration:1000},{dateRegistered:new Date(), duration:3000}]},
      {projectName:'Flutter',description:'Better Android',time:[
        {dateRegistered:new Date(), duration:3300},{dateRegistered:new Date(), duration:4000}]},
    ]);
  const addProject = newProject => {
    setProjects([...projects, newProject]);
  };
  const addTime = (projectName, newTime) => {
    let updatedProjects = projects.map( project => {
        if(project.projectName === projectName){
            return {...project,time:[...project.time, newTime]}
        } else {
            return project;
        }
    });
    console.log({updatedProjects});
    setProjects(updatedProjects);
  }

  const projectList = projects.map(project => {
      console.log(projects);
       return (<div key={project.projectName} >

        <Link to={'project/'+project.projectName.toLowerCase()} state={{project}}>  
            Open Project
        </Link>
        <Project addTime={addTime} key={project.projectName} time={project.time} name={project.projectName} description={project.description} />
      </div>)
  })

  return (
    <ProjectListContainer>
      <ProjectForm addProject={addProject} />
      {projectList}
    </ProjectListContainer>
  );
}
