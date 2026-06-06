CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  jurisdiction TEXT NOT NULL DEFAULT 'TX_ELECTRICAL',
  status TEXT NOT NULL DEFAULT 'draft',
  eligibility_result TEXT,
  wizard_answers TEXT,
  submitted_at TEXT,
  approved_at TEXT,
  license_number TEXT,
  license_expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_applications_user ON applications(user_id);
