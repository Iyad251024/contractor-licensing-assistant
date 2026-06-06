import type { Document } from "../../types/document";

export const documentRepo = {
  async create(db: D1Database, d: Omit<Document, "uploaded_at">): Promise<Document> {
    await db
      .prepare(
        `INSERT INTO documents (id, user_id, application_id, doc_type, r2_key, filename, mime, size_bytes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(d.id, d.user_id, d.application_id, d.doc_type, d.r2_key, d.filename, d.mime, d.size_bytes)
      .run();
    return (await this.findById(db, d.id))!;
  },

  async findById(db: D1Database, id: string): Promise<Document | null> {
    return db.prepare("SELECT * FROM documents WHERE id = ?").bind(id).first<Document>();
  },

  async listByUser(db: D1Database, userId: string): Promise<Document[]> {
    const r = await db
      .prepare("SELECT * FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC")
      .bind(userId)
      .all<Document>();
    return r.results ?? [];
  },

  async remove(db: D1Database, id: string) {
    await db.prepare("DELETE FROM documents WHERE id = ?").bind(id).run();
  },
};
