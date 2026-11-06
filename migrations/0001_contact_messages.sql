CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business TEXT,
  project_type TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_hash TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_ip ON contact_messages(ip_hash, created_at);
