import React from "react";
import  ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import { Link, Router } from "@reach/router"

function App() {

// under the `nav`
return (

<div>

<nav><Link to="/">Project List</Link></nav>
<Router>
  <ProjectList path="/" />
  <ProjectDetails path="project/:projectName" />
</Router>
</div>
)
}

export default App;
