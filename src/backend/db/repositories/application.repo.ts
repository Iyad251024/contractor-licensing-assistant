import type { Application, RoadmapStep, ApplicationStatus } from "../../types/application";

export const applicationRepo = {
  async create(db: D1Database, id: string, userId: string, jurisdiction: string): Promise<Application> {
    await db
      .prepare(
        `INSERT INTO applications (id, user_id, jurisdiction)
         VALUES (?, ?, ?)`,
      )
      .bind(id, userId, jurisdiction)
      .run();
    return (await this.findById(db, id))!;
  },

  async findById(db: D1Database, id: string): Promise<Application | null> {
    return db.prepare("SELECT * FROM applications WHERE id = ?").bind(id).first<Application>();
  },

  async findByUser(db: D1Database, userId: string): Promise<Application | null> {
    return db
      .prepare("SELECT * FROM applications WHERE user_id = ? ORDER BY created_at DESC LIMIT 1")
      .bind(userId)
      .first<Application>();
  },

  async update(
    db: D1Database,
    id: string,
    patch: Partial<Pick<Application, "status" | "eligibility_result" | "wizard_answers" | "submitted_at" | "approved_at" | "license_number" | "license_expires_at">>,
  ) {
    const fields = Object.keys(patch);
    if (fields.length === 0) return;
    const sets = fields.map((f) => `${f} = ?`).join(", ");
    const values = fields.map((f) => (patch as any)[f]);
    await db
      .prepare(`UPDATE applications SET ${sets}, updated_at = datetime('now') WHERE id = ?`)
      .bind(...values, id)
      .run();
  },

  async setStatus(db: D1Database, id: string, status: ApplicationStatus) {
    await this.update(db, id, { status });
  },

  async insertSteps(db: D1Database, steps: RoadmapStep[]) {
    if (steps.length === 0) return;
    const stmt = db.prepare(
      `INSERT INTO roadmap_steps (id, application_id, step_key, title, description, order_index, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    );
    const batch = steps.map((s) =>
      stmt.bind(s.id, s.application_id, s.step_key, s.title, s.description, s.order_index, s.status),
    );
    await db.batch(batch);
  },

  async listSteps(db: D1Database, applicationId: string): Promise<RoadmapStep[]> {
    const r = await db
      .prepare("SELECT * FROM roadmap_steps WHERE application_id = ? ORDER BY order_index ASC")
      .bind(applicationId)
      .all<RoadmapStep>();
    return r.results ?? [];
  },

  async clearSteps(db: D1Database, applicationId: string) {
    await db.prepare("DELETE FROM roadmap_steps WHERE application_id = ?").bind(applicationId).run();
  },

  async updateStepStatus(db: D1Database, stepId: string, status: RoadmapStep["status"]) {
    await db
      .prepare("UPDATE roadmap_steps SET status = ? WHERE id = ?")
      .bind(status, stepId)
      .run();
  },

  async findStep(db: D1Database, stepId: string): Promise<RoadmapStep | null> {
    return db.prepare("SELECT * FROM roadmap_steps WHERE id = ?").bind(stepId).first<RoadmapStep>();
  },
};
