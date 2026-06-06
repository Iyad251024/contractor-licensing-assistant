import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(120),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const eligibilitySchema = z.object({
  answers: z.record(z.union([z.boolean(), z.number(), z.string()])),
});

export const planSchema = z.object({
  plan: z.enum(["starter", "pro", "business"]),
});

export const stepUpdateSchema = z.object({
  status: z.enum(["pending", "in_progress", "done", "blocked"]),
});

export const applicationPatchSchema = z.object({
  wizard_answers: z.record(z.unknown()).optional(),
  status: z.enum(["draft", "ready", "submitted", "approved", "rejected"]).optional(),
  license_number: z.string().optional(),
  license_expires_at: z.string().optional(),
});

export function uuid(): string {
  return crypto.randomUUID();
}
