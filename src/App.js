import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { fetchResources, createResource, fetchProjects, createProject } from "./api";

function Dashboard() {
  return <h2>Dashboard (placeholder)</h2>;
}

function Resources() {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    name: "",
    role: "",
    availability: "",
    available_from: "",
    available_to: "",
    status: "proposed"
  });

  useEffect(() => {
    fetchResources().then((data) => {
      console.log("Fetched from backend:", data);
      setResources(data);
      console.log("Setting resources state:", data);
    });
  }, []);

  useEffect(() => {
    console.log("Current rendered resources:", resources);
  }, [resources]);

  const handleChange = (e) => {
    setNewResource({ ...newResource, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await createResource(newResource);
    setResources([...resources, created]);
    setNewResource({
      name: "",
      role: "",
      availability: "",
      available_from: "",
      available_to: "",
      status: "proposed"
    });
  };

  return (
    <div>
      <h2>Resources</h2>
      <ul>
        {resources.map((res) => (
          <li key={res.id}>
            {res.name} - {res.role} - {res.status} ({res.available_from} to {res.available_to})
          </li>
        ))}
      </ul>

      <h3>Add New Resource</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={newResource.name} onChange={handleChange} required />
        <input name="role" placeholder="Role" value={newResource.role} onChange={handleChange} required />
        <input name="availability" placeholder="Availability" value={newResource.availability} onChange={handleChange} />
        <input name="available_from" type="date" value={newResource.available_from} onChange={handleChange} />
        <input name="available_to" type="date" value={newResource.available_to} onChange={handleChange} />
        <select name="status" value={newResource.status} onChange={handleChange}>
          <option value="proposed">Proposed</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add Resource</button>
      </form>
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    start_date: "",
    end_date: "",
    status: ""
  });

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await createProject(newProject);
    setProjects([...projects, created]);
    setNewProject({ name: "", start_date: "", end_date: "", status: "" });
  };

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((proj) => (
          <li key={proj.id}>{proj.name} ({proj.status})</li>
        ))}
      </ul>

      <h3>Add New Project</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={newProject.name} onChange={handleChange} required />
        <input name="start_date" type="date" value={newProject.start_date} onChange={handleChange} required />
        <input name="end_date" type="date" value={newProject.end_date} onChange={handleChange} required />
        <input name="status" placeholder="Status" value={newProject.status} onChange={handleChange} />
        <button type="submit">Add Project</button>
      </form>
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
