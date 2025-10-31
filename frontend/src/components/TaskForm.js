import React, { useState } from "react";

function TaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
    status: "Open"
  });

  const backendUrl = "http://localhost:3000/tasks";

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to create task");
      setTask({ title: "", description: "", priority: "Medium", due_date: "", status: "Open" });
      onTaskAdded(); // refresh task list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task description"
        value={task.description}
        onChange={handleChange}
      />
      <div className="row">
        <label>Priority:</label>
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div className="row">
        <label>Due Date:</label>
        <input type="date" name="due_date" value={task.due_date} onChange={handleChange} />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
