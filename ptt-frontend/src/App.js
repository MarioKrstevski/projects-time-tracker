import React from 'react';

import MainPage from './components/MainPage';
import ProjectPage from './components/ProjectPage';

import { Link, Router } from '@reach/router';

function NotFound() {
  return <div>Oops we don't have this page</div>;
}
function App() {
  return (
    <div>
      <nav>
        <Link to="/">Project List</Link>
      </nav>
      <Router>
        <MainPage path="/" />
        <ProjectPage path="project/:projectName" />
        <NotFound default />
      </Router>
    </div>
  );
}

export default App;
