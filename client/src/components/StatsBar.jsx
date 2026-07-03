 export default function StatsBar({ stats }) {
  const cards = [
    { label: "Total", value: stats.total || 0, color: "#6366f1" },
    { label: "To Do", value: stats.todo || 0, color: "#f59e0b" },
    { label: "In Progress", value: stats.inProgress || 0, color: "#3b82f6" },
    { label: "Done", value: stats.done || 0, color: "#10b981" },
  ];
  return (
    <div className="stats-bar">
      {cards.map((c) => (
        <div className="stat-card" key={c.label} style={{ borderColor: c.color }}>
          <span className="stat-value" style={{ color: c.color }}>
            {c.value}
          </span>
          <span className="stat-label">{c.label}</span>
        </div>
      ))}
    </div>
  );
}