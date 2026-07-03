 import { useState, useEffect } from "react";

const EMPTY = { title: "", description: "", priority: "medium", status: "todo", dueDate: "" };

export default function TaskForm({ onSave, editing, onCancel }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (editing)
      setForm({
        ...editing,
        dueDate: editing.dueDate ? editing.dueDate.slice(0, 10) : "",
      });
    else setForm(EMPTY);
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
    setForm(EMPTY);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        placeholder="Task title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <select
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />
      <button type="submit">{editing ? "Update" : "Add Task"}</button>
      {editing && (
        <button type="button" className="cancel" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}