import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { fetchResources, fetchProjects } from "./api";

function Dashboard() {
  return <h2>Dashboard (placeholder)</h2>;
}

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources().then(setResources);
  }, []);

  return (
    <div>
      <h2>Resources</h2>
      <ul>
        {resources.map((res) => (
          <li key={res.id}>{res.name} - {res.role} - {res.status}</li>
        ))}
      </ul>
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((proj) => (
          <li key={proj.id}>{proj.name} ({proj.status})</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/">Dashboard</NavLink> |{" "}
        <NavLink to="/resources">Resources</NavLink> |{" "}
        <NavLink to="/projects">Projects</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;