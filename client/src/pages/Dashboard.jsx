import { useState, useEffect, useCallback } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import StatsBar from "../components/StatsBar";
import TaskForm from "../components/TaskForm";
import TaskColumn from "../components/TaskColumn";

const COLUMNS = [
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const loadData = useCallback(async () => {
    const [t, s] = await Promise.all([
      API.get(`/tasks?search=${search}`),
      API.get("/tasks/stats"),
    ]);
    setTasks(t.data);
    setStats(s.data);
  }, [search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveTask = async (data) => {
    if (editing) await API.put(`/tasks/${editing._id}`, data);
    else await API.post("/tasks", data);
    setEditing(null);
    loadData();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    loadData();
  };

  const moveTask = async (task, status) => {
    await API.put(`/tasks/${task._id}`, { status });
    loadData();
  };

  return (
    <div className="dashboard">
      <header className="topbar">
        <h1>📋 Task Dashboard</h1>
        <div className="topbar-right">
          <span>Hi, {user.name}</span>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <StatsBar stats={stats} />

      <div className="controls">
        <input
          className="search"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <TaskForm onSave={saveTask} editing={editing} onCancel={() => setEditing(null)} />

      <div className="board">
        {COLUMNS.map((col) => (
          <TaskColumn
            key={col.key}
            column={col}
            tasks={tasks.filter((t) => t.status === col.key)}
            onEdit={setEditing}
            onDelete={deleteTask}
            onMove={moveTask}
          />
        ))}
      </div>
    </div>
  );
}