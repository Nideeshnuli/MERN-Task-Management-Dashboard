 export default function TaskCard({ task, onEdit, onDelete }) {
  const priorityColors = { low: "#10b981", medium: "#f59e0b", high: "#ef4444" };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("task", JSON.stringify(task))}
    >
      <div className="task-header">
        <span
          className="priority-badge"
          style={{ background: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
        <div className="task-actions">
          <button onClick={() => onEdit(task)}>✏️</button>
          <button onClick={() => onDelete(task._id)}>🗑️</button>
        </div>
      </div>
      <h4>{task.title}</h4>
      {task.description && <p>{task.description}</p>}
      {task.dueDate && (
        <span className="due-date">
          📅 {new Date(task.dueDate).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}