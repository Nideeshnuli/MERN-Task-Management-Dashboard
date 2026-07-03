 import TaskCard from "./TaskCard";

export default function TaskColumn({ column, tasks, onEdit, onDelete, onMove }) {
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const task = JSON.parse(e.dataTransfer.getData("task"));
        if (task.status !== column.key) onMove(task, column.key);
      }}
    >
      <h3 className="column-title">
        {column.label} <span className="count">{tasks.length}</span>
      </h3>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}