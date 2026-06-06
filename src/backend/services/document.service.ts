import { documentRepo } from "../db/repositories/document.repo";
import { documentStorage } from "../storage/document.storage";
import { getRules } from "./rules-engine.service";
import { uuid } from "../utils/validators";
import { Errors } from "../utils/errors";
import type { Document } from "../types/document";

const MAX_DEFAULT_MB = 10;

export const documentService = {
  validate(docType: string, mime: string, sizeBytes: number) {
    const rules = getRules();
    const def = rules.requiredDocuments.find((d) => d.key === docType);
    const accepts = def?.accepts ?? ["pdf", "jpg", "png"];
    const maxMb = def?.maxMb ?? MAX_DEFAULT_MB;

    const ext = mimeToExt(mime);
    if (!ext || !accepts.includes(ext)) {
      throw Errors.badRequest(`Unsupported file type for ${docType}. Allowed: ${accepts.join(", ")}`);
    }
    if (sizeBytes > maxMb * 1024 * 1024) {
      throw Errors.badRequest(`File exceeds ${maxMb}MB limit`);
    }
  },

  async upload(
    bucket: R2Bucket,
    db: D1Database,
    userId: string,
    docType: string,
    filename: string,
    mime: string,
    body: ArrayBuffer,
    applicationId: string | null,
  ): Promise<Document> {
    this.validate(docType, mime, body.byteLength);
    const id = uuid();
    const key = `users/${userId}/${id}/${filename}`;
    await documentStorage.put(bucket, key, body, mime);
    return documentRepo.create(db, {
      id,
      user_id: userId,
      application_id: applicationId,
      doc_type: docType,
      r2_key: key,
      filename,
      mime,
      size_bytes: body.byteLength,
    });
  },

  async list(db: D1Database, userId: string) {
    return documentRepo.listByUser(db, userId);
  },

  async getDownloadStream(bucket: R2Bucket, db: D1Database, id: string, userId: string) {
    const doc = await documentRepo.findById(db, id);
    if (!doc || doc.user_id !== userId) throw Errors.notFound("Document not found");
    const obj = await documentStorage.get(bucket, doc.r2_key);
    if (!obj) throw Errors.notFound("File missing from storage");
    return { doc, object: obj };
  },

  async remove(bucket: R2Bucket, db: D1Database, id: string, userId: string) {
    const doc = await documentRepo.findById(db, id);
    if (!doc || doc.user_id !== userId) throw Errors.notFound("Document not found");
    await documentStorage.delete(bucket, doc.r2_key);
    await documentRepo.remove(db, id);
  },
};

function mimeToExt(mime: string): string | null {
  switch (mime) {
    case "application/pdf":
      return "pdf";
    case "image/jpeg":
    case "image/jpg":
      return "jpg";
    case "image/png":
      return "png";
    default:
      return null;
  }
}
