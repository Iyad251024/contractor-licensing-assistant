import { generateRoadmap } from "../rules-engine/roadmap.generator";
import { applicationRepo } from "../db/repositories/application.repo";
import { getRules } from "./rules-engine.service";
import { uuid } from "../utils/validators";
import type { RoadmapStep } from "../types/application";

export const roadmapService = {
  async generateForApplication(db: D1Database, applicationId: string) {
    const app = await applicationRepo.findById(db, applicationId);
    if (!app) throw new Error("application_not_found");
    const answers = app.wizard_answers ? JSON.parse(app.wizard_answers) : {};
    const steps = generateRoadmap(getRules(), answers);

    await applicationRepo.clearSteps(db, applicationId);
    const records: RoadmapStep[] = steps.map((s) => ({
      id: uuid(),
      application_id: applicationId,
      step_key: s.step_key,
      title: s.title,
      description: s.description,
      order_index: s.order_index,
      status: "pending",
      due_date: null,
    }));
    await applicationRepo.insertSteps(db, records);
    return records;
  },

  async list(db: D1Database, applicationId: string) {
    return applicationRepo.listSteps(db, applicationId);
  },

  async updateStepStatus(db: D1Database, stepId: string, status: RoadmapStep["status"]) {
    await applicationRepo.updateStepStatus(db, stepId, status);
  },
};
