CREATE TABLE IF NOT EXISTS roadmap_steps (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  step_key TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  due_date TEXT,
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_steps_application ON roadmap_steps(application_id);
