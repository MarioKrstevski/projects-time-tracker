import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import { Link, Router } from '@reach/router';

function App() {
  const [projects, setProjects] = useState([
    {
      projectName: 'Google',
      description: 'a search engine',
      time: [{ dateRegistered: new Date(), duration: 2000 }, { dateRegistered: new Date(), duration: 8000 }],
    },
    {
      projectName: 'Youtube',
      description: 'video sharing platform',
      time: [{ dateRegistered: new Date(), duration: 1000 }, { dateRegistered: new Date(), duration: 3000 }],
    },
    {
      projectName: 'Flutter',
      description: 'Better Android',
      time: [{ dateRegistered: new Date(), duration: 3300 }, { dateRegistered: new Date(), duration: 4000 }],
    },
  ]);

  const addNewProject = newProject => {
    setProjects([...projects, newProject]);
  };

  const addTime = (projectName, newTime) => {
    let updatedProjects = projects.map(project => {
      if (project.projectName === projectName) {
        return { ...project, time: [...project.time, newTime] };
      } else {
        return project;
      }
    });
    setProjects(updatedProjects);
  };

  // under the `nav`
  return (
    <div>
      <nav>
        <Link to="/">Project List</Link>
      </nav>
      <Router>
        <ProjectList addTime={addTime} addNewProject={addNewProject} projects={projects} path="/" />
        <ProjectDetails addTime={addTime} projects={projects} path="project/:projectName" />
      </Router>
    </div>
  );
}

export default App;