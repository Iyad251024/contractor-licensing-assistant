import { applicationRepo } from "../db/repositories/application.repo";
import { uuid } from "../utils/validators";
import { Errors } from "../utils/errors";
import { checkEligibility } from "./eligibility.service";
import type { Application, WizardAnswers } from "../types/application";

export const applicationService = {
  async getOrCreate(db: D1Database, userId: string, jurisdiction: string): Promise<Application> {
    const existing = await applicationRepo.findByUser(db, userId);
    if (existing) return existing;
    return applicationRepo.create(db, uuid(), userId, jurisdiction);
  },

  async get(db: D1Database, userId: string): Promise<Application | null> {
    return applicationRepo.findByUser(db, userId);
  },

  async saveAnswers(db: D1Database, applicationId: string, answers: WizardAnswers) {
    const result = checkEligibility(answers);
    await applicationRepo.update(db, applicationId, {
      wizard_answers: JSON.stringify(answers),
      eligibility_result: JSON.stringify(result),
      status: result.eligible ? "ready" : "draft",
    });
    return result;
  },

  async submit(db: D1Database, applicationId: string, userId: string) {
    const app = await applicationRepo.findById(db, applicationId);
    if (!app || app.user_id !== userId) throw Errors.notFound("Application not found");
    if (app.status !== "ready") throw Errors.conflict("Application is not ready to submit");
    await applicationRepo.update(db, applicationId, {
      status: "submitted",
      submitted_at: new Date().toISOString(),
    });
    return applicationRepo.findById(db, applicationId);
  },
};
