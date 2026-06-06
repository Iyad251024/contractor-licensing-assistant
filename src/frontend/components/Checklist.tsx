"use client";

export interface ChecklistStep {
  id: string;
  step_key: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "done" | "blocked";
}

export function Checklist({
  steps,
  onUpdate,
}: {
  steps: ChecklistStep[];
  onUpdate?: (id: string, status: ChecklistStep["status"]) => void;
}) {
  return (
    <ul className="checklist">
      {steps.map((s) => (
        <li key={s.id}>
          <span className={`dot ${s.status}`} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{s.title}</div>
            <div style={{ color: "var(--fg-muted)", fontSize: 14 }}>{s.description}</div>
          </div>
          {onUpdate && (
            <select
              className="select"
              style={{ width: 150 }}
              value={s.status}
              onChange={(e) => onUpdate(s.id, e.target.value as ChecklistStep["status"])}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
              <option value="blocked">Blocked</option>
            </select>
          )}
        </li>
      ))}
    </ul>
  );
}
