import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import InsightsPanel from "./components/InsightsPanel";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const backendUrl = "http://localhost:3000/tasks";

  const fetchTasks = async (status) => {
    try {
      let url = backendUrl;
      if (status) url += `?status=${status}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>🧾 Task Manager Dashboard</h1>
      <TaskForm onTaskAdded={fetchTasks} />
      <div className="filter-section">
        <label>Filter by Status: </label>
        <select value={filterStatus} onChange={(e) => { 
          setFilterStatus(e.target.value);
          fetchTasks(e.target.value);
        }}>
          <option value="">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <TaskList tasks={tasks} />
      <InsightsPanel />
    </div>
  );
}

export default App;
